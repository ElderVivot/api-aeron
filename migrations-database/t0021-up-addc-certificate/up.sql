BEGIN;

ALTER TABLE $1:name.certificate
    ADD COLUMN "hasProcurationEcac" BOOLEAN DEFAULT FALSE;

COMMIT;