-- CreateTable
CREATE TABLE "Organizacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeMae" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "sala" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "indeciso" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Decoracao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeMae" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "sala" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "indeciso" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Doce" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "sala" TEXT NOT NULL DEFAULT '',
    "origem" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "bebida" TEXT NOT NULL,
    "pessoas" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Doce" ("bebida", "createdAt", "descricao", "id", "nome", "origem", "pessoas", "telefone") SELECT "bebida", "createdAt", "descricao", "id", "nome", "origem", "pessoas", "telefone" FROM "Doce";
DROP TABLE "Doce";
ALTER TABLE "new_Doce" RENAME TO "Doce";
CREATE TABLE "new_Gasto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL DEFAULT '',
    "sala" TEXT NOT NULL DEFAULT '',
    "item" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Gasto" ("createdAt", "id", "item", "valor") SELECT "createdAt", "id", "item", "valor" FROM "Gasto";
DROP TABLE "Gasto";
ALTER TABLE "new_Gasto" RENAME TO "Gasto";
CREATE TABLE "new_Salgado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "sala" TEXT NOT NULL DEFAULT '',
    "origem" TEXT NOT NULL,
    "tipo" TEXT NOT NULL DEFAULT '',
    "descricao" TEXT NOT NULL,
    "bebida" TEXT NOT NULL,
    "pessoas" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Salgado" ("bebida", "createdAt", "descricao", "id", "nome", "origem", "pessoas", "telefone") SELECT "bebida", "createdAt", "descricao", "id", "nome", "origem", "pessoas", "telefone" FROM "Salgado";
DROP TABLE "Salgado";
ALTER TABLE "new_Salgado" RENAME TO "Salgado";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
