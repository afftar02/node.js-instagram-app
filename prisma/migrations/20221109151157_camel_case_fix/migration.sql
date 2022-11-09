/*
  Warnings:

  - You are about to drop the column `created_at` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `post_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `is_external` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hash_password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Images_Posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users_Liked_Posts` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[imageUrl]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[avatarId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdAt` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isExternal` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashPassword` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Images_Posts" DROP CONSTRAINT "Images_Posts_image_id_fkey";

-- DropForeignKey
ALTER TABLE "Images_Posts" DROP CONSTRAINT "Images_Posts_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_user_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_avatar_id_fkey";

-- DropForeignKey
ALTER TABLE "Users_Liked_Posts" DROP CONSTRAINT "Users_Liked_Posts_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Users_Liked_Posts" DROP CONSTRAINT "Users_Liked_Posts_user_id_fkey";

-- DropIndex
DROP INDEX "Image_image_url_key";

-- DropIndex
DROP INDEX "User_avatar_id_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "created_at",
DROP COLUMN "post_id",
DROP COLUMN "user_id",
ADD COLUMN     "createdAt" TIMESTAMP NOT NULL,
ADD COLUMN     "postId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "image_url",
DROP COLUMN "is_external",
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "isExternal" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "created_at",
DROP COLUMN "user_id",
ADD COLUMN     "createdAt" TIMESTAMP NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar_id",
DROP COLUMN "first_name",
DROP COLUMN "hash_password",
DROP COLUMN "last_name",
ADD COLUMN     "avatarId" INTEGER,
ADD COLUMN     "firstName" VARCHAR(255) NOT NULL,
ADD COLUMN     "hashPassword" VARCHAR(255) NOT NULL,
ADD COLUMN     "lastName" VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE "Images_Posts";

-- DropTable
DROP TABLE "Users_Liked_Posts";

-- CreateTable
CREATE TABLE "ImagesPosts" (
    "imageId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "ImagesPosts_pkey" PRIMARY KEY ("imageId","postId")
);

-- CreateTable
CREATE TABLE "UsersLikedPosts" (
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "UsersLikedPosts_pkey" PRIMARY KEY ("userId","postId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_imageUrl_key" ON "Image"("imageUrl");

-- CreateIndex
CREATE UNIQUE INDEX "User_avatarId_key" ON "User"("avatarId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesPosts" ADD CONSTRAINT "ImagesPosts_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesPosts" ADD CONSTRAINT "ImagesPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersLikedPosts" ADD CONSTRAINT "UsersLikedPosts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersLikedPosts" ADD CONSTRAINT "UsersLikedPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
