BEGIN;

ALTER TABLE public.user_client 
    ADD COLUMN "tenantQueroConhecer" VARCHAR(20) NOT NULL DEFAULT '';

COMMIT;