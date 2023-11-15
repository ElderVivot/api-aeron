CREATE TABLE IF NOT EXISTS public.client_x_user_client (
	"idClient" uuid NOT NULL,
	"idUser" uuid NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL,

    CONSTRAINT pk_client_x_user_client PRIMARY KEY ("idClient","idUser"),
    CONSTRAINT "fk_client_x_user_client_idClient" FOREIGN KEY ("idClient") REFERENCES public.client("idClient") ON DELETE CASCADE,
    CONSTRAINT "fk_client_x_user_client_idUser" FOREIGN KEY ("idUser") REFERENCES public.user_client("idUser") ON DELETE CASCADE
);

--ALTER TABLE public.client_x_user_client ADD CONSTRAINT pk_client_x_user_client PRIMARY KEY ("idClient","idUser");
--ALTER TABLE public.client_x_user_client ADD CONSTRAINT "fk_client_x_user_client_idClient" FOREIGN KEY ("idClient") REFERENCES public.client("idClient") ON DELETE CASCADE;
--ALTER TABLE public.client_x_user_client ADD CONSTRAINT "fk_client_x_user_client_idUser" FOREIGN KEY ("idUser") REFERENCES public.user_client("idUser") ON DELETE CASCADE;
