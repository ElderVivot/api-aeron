BEGIN;

ALTER TABLE $1:name.log_nota_fiscal 
    ADD COLUMN "typeSearch" VARCHAR DEFAULT 'fractional';

COMMIT;