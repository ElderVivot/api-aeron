CREATE TABLE IF NOT EXISTS public.quero_conhecer(
    "idQueroConhecer" UUID NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "phone" VARCHAR NOT NULL,
    "companie" VARCHAR NOT NULL,
    "occupation" VARCHAR NOT NULL,
    "alreadyContactedTheCustomer" BOOLEAN DEFAULT '0',

    CONSTRAINT pk_quero_conhecer PRIMARY KEY("idQueroConhecer"),
    CONSTRAINT "ck_quero_conhecer_occupation" CHECK (
        "occupation" = 'owner' OR
        "occupation" = 'director' OR
        "occupation" = 'accountant' OR
        "occupation" = 'ti' OR
        "occupation" = 'manager' OR
        "occupation" = 'consultant' OR
        "occupation" = 'analyst' OR
        "occupation" = 'assistant'
    )
);