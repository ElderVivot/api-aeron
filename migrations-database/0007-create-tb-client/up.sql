CREATE TABLE IF NOT EXISTS public.client(
    "idClient" UUID NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    "name" VARCHAR NOT NULL,
    "nickName" VARCHAR(100),
    "typeFederalRegistration" VARCHAR(20) NOT NULL,
    "federalRegistration" VARCHAR(20) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "dddPhone" INTEGER,
    "phone" VARCHAR,
    "email" VARCHAR,
    "neighborhood" VARCHAR,
    "street" VARCHAR,
    "zipCode" VARCHAR,
    "complement" VARCHAR,
    "referency" VARCHAR,
    "dateAsClient" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    "idCity" INTEGER NOT NULL,

    CONSTRAINT pk_client PRIMARY KEY("idClient"),
    CONSTRAINT "fk_client_idCity" FOREIGN KEY("idCity") REFERENCES public.city("id_city"),
    CONSTRAINT "ck_client_status" CHECK (
        "status" = 'ACTIVE' OR
        "status" = 'INACTIVE'
    ),
    CONSTRAINT "ck_client_typeFederalRegistration" CHECK (
        "typeFederalRegistration" = 'cnpj' OR
        "typeFederalRegistration" = 'cpf' OR
        "typeFederalRegistration" = 'cei' OR
        "typeFederalRegistration" = 'caepf' OR
        "typeFederalRegistration" = 'foreign'
    )
);

/*ALTER TABLE public.client ADD CONSTRAINT pk_client PRIMARY KEY("idClient");
ALTER TABLE public.client ADD CONSTRAINT "fk_client_idCity" FOREIGN KEY("idCity") REFERENCES public.city("id_city");
ALTER TABlE public.client ADD CONSTRAINT "ck_client_status" CHECK (
    "status" = 'ACTIVE' OR
    "status" = 'INACTIVE'
);
ALTER TABlE public.client ADD CONSTRAINT "ck_client_typeFederalRegistration" CHECK (
    "typeFederalRegistration" = 'cnpj' OR
    "typeFederalRegistration" = 'cpf' OR
    "typeFederalRegistration" = 'cei' OR
    "typeFederalRegistration" = 'caepf' OR
    "typeFederalRegistration" = 'foreign'
);*/