BEGIN;

ALTER TABLE $1:name.log_nfs_pref_gyn 
    ADD CONSTRAINT "fk_log_nfs_pref_gyn_idAccessPortals" FOREIGN KEY("idAccessPortals") REFERENCES $1:name.access_portals("idAccessPortals");

COMMIT;