/*
  Warnings:

  - You are about to drop the column `Estado` on the `InsumoEvaluacion` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Examen" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricion" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'Activo'
);
INSERT INTO "new_Examen" ("descricion", "id") SELECT "descricion", "id" FROM "Examen";
DROP TABLE "Examen";
ALTER TABLE "new_Examen" RENAME TO "Examen";
CREATE TABLE "new_Pregunta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pregunta" TEXT NOT NULL,
    "categoria" TEXT,
    "respuestacorrecta" BOOLEAN NOT NULL DEFAULT false,
    "estado" TEXT NOT NULL DEFAULT 'Activo'
);
INSERT INTO "new_Pregunta" ("categoria", "id", "pregunta", "respuestacorrecta") SELECT "categoria", "id", "pregunta", "respuestacorrecta" FROM "Pregunta";
DROP TABLE "Pregunta";
ALTER TABLE "new_Pregunta" RENAME TO "Pregunta";
CREATE TABLE "new_InsumoEvaluacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "preguntaid" INTEGER NOT NULL,
    "examenID" INTEGER NOT NULL,
    "valor" INTEGER NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'Activo',
    CONSTRAINT "InsumoEvaluacion_preguntaid_fkey" FOREIGN KEY ("preguntaid") REFERENCES "Pregunta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "InsumoEvaluacion_examenID_fkey" FOREIGN KEY ("examenID") REFERENCES "Examen" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_InsumoEvaluacion" ("examenID", "id", "preguntaid", "valor") SELECT "examenID", "id", "preguntaid", "valor" FROM "InsumoEvaluacion";
DROP TABLE "InsumoEvaluacion";
ALTER TABLE "new_InsumoEvaluacion" RENAME TO "InsumoEvaluacion";
PRAGMA foreign_key_check("Examen");
PRAGMA foreign_key_check("Pregunta");
PRAGMA foreign_key_check("InsumoEvaluacion");
PRAGMA foreign_keys=ON;
