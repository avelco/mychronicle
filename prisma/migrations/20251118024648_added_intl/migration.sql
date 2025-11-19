/*
  Warnings:

  - You are about to drop the column `bio` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Chronicle` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Chronicle` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Decision` table. All the data in the column will be lost.
  - You are about to drop the column `altText` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Scene` table. All the data in the column will be lost.
  - Added the required column `language` to the `PlaythroughLogAI` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Language" AS ENUM ('EN', 'ES');

-- AlterTable
ALTER TABLE "Author" DROP COLUMN "bio",
DROP COLUMN "name";

-- AlterTable
ALTER TABLE "Chronicle" DROP COLUMN "description",
DROP COLUMN "title";

-- AlterTable
ALTER TABLE "Decision" DROP COLUMN "text";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "altText";

-- AlterTable
ALTER TABLE "PlaythroughLogAI" ADD COLUMN     "language" "Language" NOT NULL;

-- AlterTable
ALTER TABLE "Scene" DROP COLUMN "content";

-- CreateTable
CREATE TABLE "AuthorTranslation" (
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "authorId" TEXT NOT NULL,
    "language" "Language" NOT NULL,

    CONSTRAINT "AuthorTranslation_pkey" PRIMARY KEY ("authorId","language")
);

-- CreateTable
CREATE TABLE "ChronicleTranslation" (
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "chronicleId" TEXT NOT NULL,
    "language" "Language" NOT NULL,

    CONSTRAINT "ChronicleTranslation_pkey" PRIMARY KEY ("chronicleId","language")
);

-- CreateTable
CREATE TABLE "ImageTranslation" (
    "altText" TEXT,
    "imageId" TEXT NOT NULL,
    "language" "Language" NOT NULL,

    CONSTRAINT "ImageTranslation_pkey" PRIMARY KEY ("imageId","language")
);

-- CreateTable
CREATE TABLE "SceneTranslation" (
    "content" TEXT NOT NULL,
    "sceneId" TEXT NOT NULL,
    "language" "Language" NOT NULL,

    CONSTRAINT "SceneTranslation_pkey" PRIMARY KEY ("sceneId","language")
);

-- CreateTable
CREATE TABLE "DecisionTranslation" (
    "text" TEXT NOT NULL,
    "decisionId" TEXT NOT NULL,
    "language" "Language" NOT NULL,

    CONSTRAINT "DecisionTranslation_pkey" PRIMARY KEY ("decisionId","language")
);

-- AddForeignKey
ALTER TABLE "AuthorTranslation" ADD CONSTRAINT "AuthorTranslation_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChronicleTranslation" ADD CONSTRAINT "ChronicleTranslation_chronicleId_fkey" FOREIGN KEY ("chronicleId") REFERENCES "Chronicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageTranslation" ADD CONSTRAINT "ImageTranslation_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SceneTranslation" ADD CONSTRAINT "SceneTranslation_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "Scene"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecisionTranslation" ADD CONSTRAINT "DecisionTranslation_decisionId_fkey" FOREIGN KEY ("decisionId") REFERENCES "Decision"("id") ON DELETE CASCADE ON UPDATE CASCADE;
