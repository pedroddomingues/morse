-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "url" VARCHAR(6) NOT NULL DEFAULT nanoid();
