CREATE TABLE IF NOT EXISTS public.type_access_portals(
    "idTypeAccessPortals" UUID NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "whatAccesses" VARCHAR NOT NULL,
    "nameTypeAccess" VARCHAR NOT NULL,

    CONSTRAINT pk_type_access_portals PRIMARY KEY ("idTypeAccessPortals"),
    CONSTRAINT "ck_type_access_portals_whatAccesses" CHECK (
        "whatAccesses" = 'prefecture' OR
        "whatAccesses" = 'bank'
    )
);

INSERT INTO public.type_access_portals ("idTypeAccessPortals", "whatAccesses", "nameTypeAccess")
VALUES ('6a009e00-47b0-4e45-a28f-87a3481b2060', 'prefecture', 'GOIANIA - Portal Contribuinte');