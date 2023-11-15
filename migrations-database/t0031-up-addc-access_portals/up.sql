BEGIN;

ALTER TABLE $1:name.access_portals
    ADD COLUMN "timestampPasswordIncorrect" TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL;

COMMIT;