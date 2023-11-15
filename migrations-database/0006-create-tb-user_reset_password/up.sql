CREATE TABLE IF NOT EXISTS public.user_client_reset_password(
    "idResetPassword" UUID NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
    "used" BOOLEAN NOT NULL DEFAULT false,
    "idUser" UUID NOT NULL,

    CONSTRAINT pk_user_reset_password PRIMARY KEY("idResetPassword"),
    CONSTRAINT "fk_user_reset_password_idUser" FOREIGN KEY("idUser") REFERENCES public.user_client("idUser")
);

--ALTER TABLE public.user_client_reset_password ADD CONSTRAINT pk_user_reset_password PRIMARY KEY("idResetPassword");
--ALTER TABLE public.user_client_reset_password ADD CONSTRAINT "fk_user_reset_password_idUser" FOREIGN KEY("idUser") REFERENCES public.user_client("idUser");