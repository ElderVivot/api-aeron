BEGIN;

ALTER TABLE public.client DROP CONSTRAINT "ck_client_status";

ALTER TABLE public.client 
    ADD COLUMN "modules" VARCHAR NOT NULL DEFAULT 'folha,fiscal,contabil',
    
    ADD CONSTRAINT "ck_client_status" CHECK (
        "status" = 'ACTIVE' OR
        "status" = 'INACTIVE' OR
        "status" = 'TESTING' OR
        "status" = 'TESTED_NOT_CONTINUE' OR
        "status" = 'ACTIVE_AERON' OR
        "status" = 'INACTIVE_AERON'
    );

COMMIT;