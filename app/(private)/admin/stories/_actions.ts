"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Language, StoryType, Prisma } from "@/lib/generated/prisma/client";
import { uploadFileToWasabi } from "@/lib/s3";

// Define return types to ensure serializability
export type StoryWithTranslations = Prisma.ChronicleGetPayload<{
	include: {
		translations: true;
		author: {
			include: {
				translations: true;
			};
		};
	};
}>;

export async function getStories(): Promise<{
	success: boolean;
	data?: StoryWithTranslations[];
	error?: string;
}> {
	try {
		const user = await currentUser();
		if (!user) {
			return { success: false, error: "Unauthorized" };
		}

		const stories = await prisma.chronicle.findMany({
			include: {
				translations: true,
				author: {
					include: {
						translations: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return { success: true, data: stories };
	} catch (error) {
		console.error("Error fetching stories:", error);
		return { success: false, error: "Failed to fetch stories" };
	}
}

export async function createStory(formData: FormData) {
	const user = await currentUser();
	if (!user) {
		return { success: false, error: "Unauthorized" };
	}

	const title = formData.get("title") as string;
	const description = formData.get("description") as string;
	let coverImageUrl =
		(formData.get("coverImageUrl") as string) || "https://placehold.co/600x400";
	const type = (formData.get("type") as StoryType) || StoryType.STATIC;
	const language = (formData.get("language") as Language) || Language.EN;

	const coverImageFile = formData.get("coverImage") as File | null;

	if (coverImageFile && coverImageFile.size > 0) {
		try {
			const buffer = Buffer.from(await coverImageFile.arrayBuffer());
			const fileName = `stories/${title}/${Date.now()}-${coverImageFile.name}`;
			coverImageUrl = await uploadFileToWasabi(
				buffer,
				fileName,
				coverImageFile.type
			);
		} catch (error) {
			console.error("Error uploading image:", error);
			return {
				success: false,
				error: `Failed to upload image: ${(error as Error).message}`,
			};
		}
	}

	if (!title || !description) {
		return { success: false, error: "Title and description are required" };
	}

	try {
		// Ensure Author exists for the user
		let author = await prisma.author.findUnique({
			where: { userId: user.id },
		});

		if (!author) {
			// Create a default author profile
			author = await prisma.author.create({
				data: {
					userId: user.id,
					translations: {
						create: {
							language: language,
							name: `${user.firstName} ${user.lastName || ""}`.trim(),
							bio: "New author",
						},
					},
				},
			});
		}

		const story = await prisma.chronicle.create({
			data: {
				coverImageUrl,
				type,
				authorId: author.id,
				translations: {
					create: {
						title,
						description,
						language,
					},
				},
			},
		});

		revalidatePath("/admin/stories");
		return { success: true, data: story };
	} catch (error) {
		console.error("Error creating story:", error);
		return { success: false, error: "Failed to create story" };
	}
}

export async function updateStory(id: string, formData: FormData) {
	const user = await currentUser();
	if (!user) {
		return { success: false, error: "Unauthorized" };
	}

	const title = formData.get("title") as string;
	const description = formData.get("description") as string;
	const coverImageUrl = formData.get("coverImageUrl") as string;
	const isPublished = formData.get("isPublished") === "true";
	const language = (formData.get("language") as Language) || Language.EN;

	try {
		// Update Chronicle fields
		await prisma.chronicle.update({
			where: { id },
			data: {
				coverImageUrl,
				isPublished,
				translations: {
					upsert: {
						where: {
							chronicleId_language: {
								chronicleId: id,
								language,
							},
						},
						create: {
							title,
							description,
							language,
						},
						update: {
							title,
							description,
						},
					},
				},
			},
		});

		revalidatePath("/admin/stories");
		return { success: true };
	} catch (error) {
		console.error("Error updating story:", error);
		return { success: false, error: "Failed to update story" };
	}
}

export async function deleteStory(id: string) {
	const user = await currentUser();
	if (!user) {
		return { success: false, error: "Unauthorized" };
	}

	try {
		await prisma.chronicle.delete({
			where: { id },
		});

		revalidatePath("/admin/stories");
		return { success: true };
	} catch (error) {
		console.error("Error deleting story:", error);
		return { success: false, error: "Failed to delete story" };
	}
}
