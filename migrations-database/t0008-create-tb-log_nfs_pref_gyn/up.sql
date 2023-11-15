CREATE TABLE IF NOT EXISTS $1:name.log_nfs_pref_gyn (
	"idLogNfsPrefGyn" UUID NOT NULL,
	"idAccessPortals" UUID NOT NULL,
    "idCompanie" UUID NULL,
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
	"cityRegistration" VARCHAR(30) NULL,
    "nameCompanie" VARCHAR NULL,
	"dateStartDown" TIMESTAMP WITHOUT TIME ZONE NULL,
	"dateEndDown" TIMESTAMP WITHOUT TIME ZONE NULL,
	"typeLog" VARCHAR NOT NULL,
	"messageLog" VARCHAR NOT NULL,
	"messageLogToShowUser" VARCHAR NOT NULL,
	"messageError" VARCHAR NULL,
	"urlPrintLog" VARCHAR NULL,
	"qtdNotesDown" INTEGER NULL DEFAULT 0,
	"qtdTimesReprocessed" INTEGER NOT NULL DEFAULT 0,

	CONSTRAINT pk_log_nfs_pref_gyn PRIMARY KEY ("idLogNfsPrefGyn"),
    CONSTRAINT "fk_log_nfs_pref_gyn_idCompanie" FOREIGN KEY("idCompanie") REFERENCES $1:name.companie("idCompanie"),
    CONSTRAINT "ck_log_nfs_pref_gyn_typeLog" CHECK (
        "typeLog" = 'success' OR
        "typeLog" = 'warning' OR
        "typeLog" = 'error' OR
        "typeLog" = 'processing' OR
        "typeLog" = 'to_process'
    )
);