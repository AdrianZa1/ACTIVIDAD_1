-- CreateTable
CREATE TABLE "Auditoria" (
    "id" SERIAL NOT NULL,
    "entidad" TEXT NOT NULL,
    "detalle" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL,
    "id_auditoria" INTEGER,
    "estado" TEXT NOT NULL DEFAULT 'Activo',

    CONSTRAINT "Auditoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Examen" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'Activo',

    CONSTRAINT "Examen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pregunta" (
    "id" SERIAL NOT NULL,
    "pregunta" TEXT NOT NULL,
    "categoria" TEXT,
    "respuestacorrecta" BOOLEAN NOT NULL DEFAULT false,
    "estado" TEXT NOT NULL DEFAULT 'Activo',

    CONSTRAINT "Pregunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsumoEvaluacion" (
    "id" SERIAL NOT NULL,
    "preguntaid" INTEGER NOT NULL,
    "examenID" INTEGER NOT NULL,
    "valor" INTEGER NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'Activo',

    CONSTRAINT "InsumoEvaluacion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InsumoEvaluacion" ADD CONSTRAINT "InsumoEvaluacion_preguntaid_fkey" FOREIGN KEY ("preguntaid") REFERENCES "Pregunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsumoEvaluacion" ADD CONSTRAINT "InsumoEvaluacion_examenID_fkey" FOREIGN KEY ("examenID") REFERENCES "Examen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
