/*
  Warnings:

  - You are about to drop the column `nomeMae` on the `Decoracao` table. All the data in the column will be lost.
  - You are about to drop the column `nomeMae` on the `Organizacao` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Decoracao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL DEFAULT '',
    "whatsapp" TEXT NOT NULL,
    "sala" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "indeciso" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Decoracao" ("createdAt", "descricao", "id", "indeciso", "quantidade", "sala", "whatsapp") SELECT "createdAt", "descricao", "id", "indeciso", "quantidade", "sala", "whatsapp" FROM "Decoracao";
DROP TABLE "Decoracao";
ALTER TABLE "new_Decoracao" RENAME TO "Decoracao";
CREATE TABLE "new_Organizacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL DEFAULT '',
    "whatsapp" TEXT NOT NULL,
    "sala" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "indeciso" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Organizacao" ("createdAt", "descricao", "id", "indeciso", "quantidade", "sala", "whatsapp") SELECT "createdAt", "descricao", "id", "indeciso", "quantidade", "sala", "whatsapp" FROM "Organizacao";
DROP TABLE "Organizacao";
ALTER TABLE "new_Organizacao" RENAME TO "Organizacao";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
