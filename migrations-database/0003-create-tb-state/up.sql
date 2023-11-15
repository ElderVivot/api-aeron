------------- table state ----------------------------
CREATE SEQUENCE IF NOT EXISTS public.id_state_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE IF NOT EXISTS public.state(
    id_state INTEGER NOT NULL DEFAULT nextval('id_state_seq'::regclass),
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
    name VARCHAR NOT NULL,
    acronym VARCHAR(2) NOT NULL,

    CONSTRAINT pk_state PRIMARY KEY(id_state),
    CONSTRAINT uc_state_acronym UNIQUE (acronym)
);

--ALTER TABLE public.state ADD CONSTRAINT pk_state PRIMARY KEY(id_state);
--ALTER TABLE public.state ADD CONSTRAINT uc_state_acronym UNIQUE (acronym);
--------------------------------------------------------