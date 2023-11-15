CREATE TABLE IF NOT EXISTS $1:name.access_portals(
    "idAccessPortals" UUID NOT NULL,
    "idTypeAccessPortals" UUID NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    "nameAccess" VARCHAR NOT NULL,
    "login" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "status" VARCHAR(20) NOT NULL,

    CONSTRAINT pk_access_portals PRIMARY KEY ("idAccessPortals"),
    CONSTRAINT "fk_access_portals_idTypeAccessPortals" FOREIGN KEY("idTypeAccessPortals") REFERENCES public.type_access_portals("idTypeAccessPortals"),
    CONSTRAINT "ck_access_portals_status" CHECK (
        "status" = 'ACTIVE' OR
        "status" = 'INACTIVE'
    )
);