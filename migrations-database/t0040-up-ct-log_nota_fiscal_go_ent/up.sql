BEGIN;

ALTER TABLE $1:name.log_nota_fiscal_go_ent
    ADD COLUMN "idAccessPortals" UUID NOT NULL,    
    ADD CONSTRAINT "fk_log_nota_fiscal_go_ent_idAccessPortals" FOREIGN KEY("idAccessPortals") REFERENCES $1:name.access_portals("idAccessPortals");

COMMIT;