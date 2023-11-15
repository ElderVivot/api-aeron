CREATE TABLE IF NOT EXISTS public.routines (
	"idRoutine" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "module" VARCHAR NOT NULL,
    "dependsOn" VARCHAR,

	CONSTRAINT pk_routines PRIMARY KEY ("idRoutine")
);

INSERT INTO public.routines ("idRoutine", "name", "module", "dependsOn")
VALUES ('esocial_send_s1200', 'Esocial - Enviar S1200', 'folha', NULL);

INSERT INTO public.routines ("idRoutine", "name", "module", "dependsOn")
VALUES ('esocial_send_s1210', 'Esocial - Enviar S1210', 'folha', 'esocial_send_s1200');

INSERT INTO public.routines ("idRoutine", "name", "module", "dependsOn")
VALUES ('esocial_send_s1299', 'Esocial - Enviar S1299', 'folha', 'esocial_send_s1210');