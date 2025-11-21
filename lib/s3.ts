import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const region = process.env.WASABI_REGION || "us-east-1";
const endpoint = region === "us-east-1" 
  ? "https://s3.wasabisys.com" 
  : `https://s3.${region}.wasabisys.com`;

const s3Client = new S3Client({
  region,
  endpoint,
  credentials: {
    accessKeyId: process.env.WASABI_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.WASABI_SECRET_ACCESS_KEY || "",
  },
});

export async function uploadFileToWasabi(
  file: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  if (!process.env.WASABI_ACCESS_KEY_ID || !process.env.WASABI_SECRET_ACCESS_KEY) {
    throw new Error("WASABI_ACCESS_KEY_ID or WASABI_SECRET_ACCESS_KEY is missing");
  }

  const bucketName = process.env.WASABI_BUCKET_NAME;
  
  if (!bucketName) {
    throw new Error("WASABI_BUCKET_NAME is not defined");
  }

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: file,
    ContentType: contentType,
    ACL: "public-read", // Assuming we want the image to be publicly accessible
  });

  try {
    await s3Client.send(command);
    return `${endpoint}/${bucketName}/${fileName}`;
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw error;
  }
}
