-- CreateTable
CREATE TABLE "Examen" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricion" TEXT
);

-- CreateTable
CREATE TABLE "Pregunta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pregunta" TEXT NOT NULL,
    "categoria" TEXT,
    "respuestacorrecta" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "InsumoEvaluacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "preguntaid" INTEGER NOT NULL,
    "examenID" INTEGER NOT NULL,
    "valor" INTEGER NOT NULL,
    "Estado" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "InsumoEvaluacion_preguntaid_fkey" FOREIGN KEY ("preguntaid") REFERENCES "Pregunta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "InsumoEvaluacion_examenID_fkey" FOREIGN KEY ("examenID") REFERENCES "Examen" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
