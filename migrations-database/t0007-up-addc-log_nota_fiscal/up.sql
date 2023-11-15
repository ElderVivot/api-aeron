BEGIN;

ALTER TABLE $1:name.log_nota_fiscal 
    ADD COLUMN "urlPrintLog" VARCHAR;

COMMIT;