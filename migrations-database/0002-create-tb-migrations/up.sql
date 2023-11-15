------------- table migrations -----------------------
CREATE SEQUENCE IF NOT EXISTS public.id_migrations_executed_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE IF NOT EXISTS public.migrations_executed(
    "idMigrationExecuted" INTEGER NOT NULL DEFAULT nextval('id_migrations_executed_seq'::regclass),
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
    "schema" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "typeResult" CHAR(1) NOT NULL,
    "result" TEXT NOT NULL,

    CONSTRAINT pk_migrations_executed PRIMARY KEY("idMigrationExecuted"),
    CONSTRAINT "ck_migrations_typeResult" CHECK (
        "typeResult" = 'S' OR
        "typeResult" = 'E'
    )
);

COMMENT ON COLUMN public.migrations_executed."typeResult" IS 'S = Success; E = Error';

--ALTER TABLE public.migrations_executed ADD CONSTRAINT pk_migrations_executed PRIMARY KEY(idMigrationExecuted);
--------------------------------------------------------