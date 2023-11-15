CREATE TABLE IF NOT EXISTS public.user_client_permissions(
    "idUserPermissions" UUID NOT NULL,
    "idUser" UUID NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    "functionality" VARCHAR,
    "permissions" VARCHAR,

    CONSTRAINT "pk_user_client_permissions" PRIMARY KEY("idUserPermissions"),
    CONSTRAINT "fk_user_client_permissions_idUser" FOREIGN KEY ("idUser") REFERENCES public.user_client("idUser") ON DELETE CASCADE 
);

--ALTER TABLE public.user_client ADD CONSTRAINT pk_user_client PRIMARY KEY("idUser");
--ALTER TABLE public.user_client ADD CONSTRAINT uc_user_client_username UNIQUE("username");