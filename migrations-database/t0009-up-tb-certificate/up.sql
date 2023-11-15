BEGIN;

ALTER TABLE $1:name.certificate DROP CONSTRAINT "fk_certificate_idCompanie";
ALTER TABLE $1:name.certificate DROP COLUMN "idCompanie";

COMMIT;