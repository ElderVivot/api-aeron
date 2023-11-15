CREATE TABLE IF NOT EXISTS public.user_client(
    "idUser" UUID NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "confirmedRegistration" BOOLEAN NOT NULL DEFAULT false,
    "email" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "nickName" VARCHAR(50) NOT NULL,
    "dddPhone" INTEGER,
    "phone" VARCHAR,

    CONSTRAINT pk_user_client PRIMARY KEY("idUser"),
    CONSTRAINT uc_user_client_username UNIQUE("username")
);

--ALTER TABLE public.user_client ADD CONSTRAINT pk_user_client PRIMARY KEY("idUser");
--ALTER TABLE public.user_client ADD CONSTRAINT uc_user_client_username UNIQUE("username");