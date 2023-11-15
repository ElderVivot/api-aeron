BEGIN;

ALTER TABLE public.user_client 
    ADD COLUMN "isUserMain" BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN "departaments" VARCHAR NOT NULL DEFAULT 'folha,fiscal,contabil';

COMMIT;