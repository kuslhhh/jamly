/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Streams` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,streamId]` on the table `Upvotes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `type` on the `Streams` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StreamType" AS ENUM ('Spotify', 'Youtube');

-- AlterTable
ALTER TABLE "Streams" DROP COLUMN "type",
ADD COLUMN     "type" "StreamType" NOT NULL;

-- DropEnum
DROP TYPE "StremType";

-- CreateIndex
CREATE UNIQUE INDEX "Streams_url_key" ON "Streams"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Upvotes_userId_streamId_key" ON "Upvotes"("userId", "streamId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
