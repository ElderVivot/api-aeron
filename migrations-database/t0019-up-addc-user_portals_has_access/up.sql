BEGIN;

ALTER TABLE $1:name.user_portals_has_access ALTER COLUMN "idAccessPortals" DROP NOT NULL;

ALTER TABLE $1:name.user_portals_has_access
    ADD COLUMN "idTypeAccessPortals" UUID,
    ADD COLUMN "idCertificate" UUID,
    ADD COLUMN "dateStartAccess" DATE,
    ADD COLUMN "dateEndAccess" DATE,
    ADD CONSTRAINT "fk_user_portals_has_access_idTypeAccessPortals" FOREIGN KEY("idTypeAccessPortals") REFERENCES public.type_access_portals("idTypeAccessPortals"),
    ADD CONSTRAINT "fk_user_portals_has_access_idCertificate" FOREIGN KEY("idCertificate") REFERENCES $1:name.certificate("idCertificate");

COMMIT;