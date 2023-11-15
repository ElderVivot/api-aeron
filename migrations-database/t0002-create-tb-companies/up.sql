CREATE TABLE IF NOT EXISTS $1:name.companie(
    "idCompanie" UUID NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    "codeCompanieAccountSystem" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "nickName" VARCHAR(100),
    "typeFederalRegistration" VARCHAR(20) NOT NULL,
    "federalRegistration" VARCHAR(20) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "stateRegistration" VARCHAR(30),
    "cityRegistration" VARCHAR(30),
    "dddPhone" INTEGER,
    "phone" VARCHAR,
    "email" VARCHAR,
    "neighborhood" VARCHAR,
    "street" VARCHAR,
    "zipCode" VARCHAR,
    "complement" VARCHAR,
    "referency" VARCHAR,
    "dateInicialAsCompanie" TIMESTAMP WITHOUT TIME ZONE,
    "dateInicialAsClient" TIMESTAMP WITHOUT TIME ZONE,
    "dateFinalAsClient" TIMESTAMP WITHOUT TIME ZONE,
    "cnaes" VARCHAR,
    "taxRegime" VARCHAR(2) NOT NULL DEFAULT '99',
    "idCity" INTEGER NOT NULL,

    CONSTRAINT pk_companies PRIMARY KEY("idCompanie"),
    CONSTRAINT "fk_companies_idCity" FOREIGN KEY("idCity") REFERENCES public.city("id_city"),
    CONSTRAINT "ck_companies_status" CHECK (
        "status" = 'ACTIVE' OR
        "status" = 'INACTIVE'
    ),
    CONSTRAINT "ck_companies_typeFederalRegistration" CHECK (
        "typeFederalRegistration" = 'cnpj' OR
        "typeFederalRegistration" = 'cpf' OR
        "typeFederalRegistration" = 'cei' OR
        "typeFederalRegistration" = 'caepf' OR
        "typeFederalRegistration" = 'foreign'
    ),
    CONSTRAINT "ck_companies_taxRegime" CHECK (
        "taxRegime" = '01' OR
        "taxRegime" = '02' OR
        "taxRegime" = '03' OR
        "taxRegime" = '99'
    )
);

COMMENT ON COLUMN $1:name.companie."taxRegime" IS '01 = Simples Nacional; 02 = Lucro Presumido; 03 = Lucro Real; 99 = Outros';