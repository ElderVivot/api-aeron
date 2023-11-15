CREATE TABLE IF NOT EXISTS $1:name.log_nota_fiscal_go_ent(
	"idLogNotaFiscal" UUID NOT NULL,
    "idCompanie" UUID NOT NULL,
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
	"modelNotaFiscal" VARCHAR(2) NOT NULL,
	"dateStartDown" TIMESTAMP WITHOUT TIME ZONE NULL,
	"dateEndDown" TIMESTAMP WITHOUT TIME ZONE NULL,
	"typeLog" VARCHAR NOT NULL,
	"messageLog" VARCHAR NOT NULL,
	"messageLogToShowUser" VARCHAR NOT NULL,
	"messageError" VARCHAR NULL,
	"qtdNotesDown" INTEGER NULL DEFAULT 0,
	"qtdTimesReprocessed" INTEGER NOT NULL DEFAULT 0,
	"pageInicial" INTEGER NOT NULL DEFAULT 0,
	"pageFinal" INTEGER NOT NULL DEFAULT 0,
    "qtdPagesTotal" INTEGER NOT NULL DEFAULT 0,
    "urlPrintLog" VARCHAR NULL,

	CONSTRAINT pk_log_nota_fiscal_go_ent PRIMARY KEY ("idLogNotaFiscal"),
    CONSTRAINT "fk_log_nota_fiscal_go_ent_idCompanie" FOREIGN KEY("idCompanie") REFERENCES $1:name.companie("idCompanie"),
    CONSTRAINT "ck_log_nota_fiscal_go_ent_modelNotaFiscal" CHECK (
        "modelNotaFiscal" = '00' OR
        "modelNotaFiscal" = '55' OR
        "modelNotaFiscal" = '65' OR
        "modelNotaFiscal" = '57'
    ),
    CONSTRAINT "ck_log_nota_fiscal_go_ent_pageInicial" CHECK (
        "pageInicial" <= "pageFinal"
    )
);

COMMENT ON COLUMN $1:name.log_nota_fiscal_go_ent."modelNotaFiscal" IS '00 = Todas; 55 = NFe; 57 = CTe; 65 = NFCe';