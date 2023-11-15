CREATE TABLE IF NOT EXISTS $1:name.user_portals_has_access(
	"idUserPortalsHasAccess" UUID NOT NULL,
    "idAccessPortals" UUID NOT NULL,
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    "nameCompanie" VARCHAR NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "stateRegistration" VARCHAR(30),
	"cityRegistration" VARCHAR(30),
    "federalRegistration" VARCHAR(20),
    "nameCity" VARCHAR,

	CONSTRAINT pk_user_portals_has_access PRIMARY KEY ("idUserPortalsHasAccess"),
    CONSTRAINT "fk_user_portals_has_access_idAccessPortals" FOREIGN KEY("idAccessPortals") REFERENCES $1:name.access_portals("idAccessPortals"),
    CONSTRAINT "ck_user_portals_has_access_status" CHECK (
        "status" = 'ACTIVE' OR
        "status" = 'INACTIVE' OR
        "status" = 'DROPED' OR
        "status" = 'PARALYZED' OR
        "status" = 'SUSPENDED'
    )
);

COMMENT ON COLUMN $1:name.user_portals_has_access."status" IS 'ACTIVE - Ativo; INACTIVE - Inativo; DROPED - Baixado; PARALYZED - Paralizado; SUSPENDED - Suspenso';