CREATE TABLE IF NOT EXISTS $1:name.log_nota_fiscal (
	"idLogNotaFiscal" UUID NOT NULL,
    "idCompanie" UUID NOT NULL,
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
	"modelNotaFiscal" VARCHAR(2) NOT NULL,
    "situationNotaFiscal" VARCHAR(2) NOT NULL,
	"dateStartDown" TIMESTAMP WITHOUT TIME ZONE NULL,
	"dateEndDown" TIMESTAMP WITHOUT TIME ZONE NULL,
	"typeLog" VARCHAR NOT NULL,
	"messageLog" VARCHAR NOT NULL,
	"messageLogToShowUser" VARCHAR NOT NULL,
	"wayCertificate" VARCHAR NOT NULL,
	"messageError" VARCHAR NULL,
	"qtdNotesDown" INTEGER NULL DEFAULT 0,
	"qtdTimesReprocessed" INTEGER NOT NULL DEFAULT 0,
	"pageInicial" INTEGER NOT NULL DEFAULT 0,
	"pageFinal" INTEGER NOT NULL DEFAULT 0,
    "qtdPagesTotal" INTEGER NOT NULL DEFAULT 0,

	CONSTRAINT pk_log_nota_fiscal PRIMARY KEY ("idLogNotaFiscal"),
    CONSTRAINT "fk_log_nota_fiscal_idCompanie" FOREIGN KEY("idCompanie") REFERENCES $1:name.companie("idCompanie"),
    CONSTRAINT "ck_log_nota_fiscal_typeLog" CHECK (
        "typeLog" = 'success' OR
        "typeLog" = 'warning' OR
        "typeLog" = 'error' OR
        "typeLog" = 'processing' OR
        "typeLog" = 'to_process'
    ),
    CONSTRAINT "ck_log_nota_fiscal_modelNotaFiscal" CHECK (
        "modelNotaFiscal" = '55' OR
        "modelNotaFiscal" = '65' OR
        "modelNotaFiscal" = '57'
    ),
    CONSTRAINT "ck_log_nota_fiscal_situationNotaFiscal" CHECK (
        "situationNotaFiscal" = '1' OR
        "situationNotaFiscal" = '2' OR
        "situationNotaFiscal" = '3'
    ),
    CONSTRAINT "ck_log_nota_fiscal_pageInicial" CHECK (
        "pageInicial" <= "pageFinal"
    )
);

COMMENT ON COLUMN $1:name.log_nota_fiscal."situationNotaFiscal" IS '1 = Autorizadas; 2 = Canceladas; 3 = Inutilizadas';