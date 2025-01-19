/*
  Warnings:

  - You are about to drop the column `position` on the `MenuCategory` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `variantId` on the `VariantOption` table. All the data in the column will be lost.
  - You are about to drop the `ItemVariant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemVariant" DROP CONSTRAINT "ItemVariant_itemId_fkey";

-- DropForeignKey
ALTER TABLE "VariantOption" DROP CONSTRAINT "VariantOption_variantId_fkey";

-- AlterTable
ALTER TABLE "MenuCategory" DROP COLUMN "position";

-- AlterTable
ALTER TABLE "MenuItem" DROP COLUMN "position",
DROP COLUMN "weight";

-- AlterTable
ALTER TABLE "VariantOption" DROP COLUMN "variantId",
ADD COLUMN     "menuItemId" TEXT;

-- DropTable
DROP TABLE "ItemVariant";

-- AddForeignKey
ALTER TABLE "VariantOption" ADD CONSTRAINT "VariantOption_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
