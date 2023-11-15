CREATE SEQUENCE IF NOT EXISTS public.id_city_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE IF NOT EXISTS public.city
(
    id_city INTEGER NOT NULL DEFAULT nextval('id_city_seq'::regclass),
    name VARCHAR NOT NULL,
    id_ibge INTEGER NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
    id_state INTEGER,

    CONSTRAINT pk_city_id PRIMARY KEY(id_city),
    CONSTRAINT fk_city_id_state FOREIGN KEY(id_state) REFERENCES public.state(id_state)
);

--ALTER TABLE public.city ADD CONSTRAINT pk_city_id PRIMARY KEY(id_city);
--ALTER TABLE public.city ADD CONSTRAINT fk_city_id_state FOREIGN KEY(id_state) REFERENCES public.state(id_state);