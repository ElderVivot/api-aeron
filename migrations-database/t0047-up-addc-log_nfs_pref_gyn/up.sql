BEGIN;

ALTER TABLE $1:name.log_nfs_pref_gyn
    ADD COLUMN "urlsXmls" VARCHAR NULL;

COMMIT;