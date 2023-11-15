BEGIN;

ALTER TABLE $1:name.log_nota_fiscal DROP CONSTRAINT "ck_log_nota_fiscal_situationNotaFiscal";

ALTER TABLE $1:name.log_nota_fiscal 
    ADD CONSTRAINT "ck_log_nota_fiscal_situationNotaFiscal" CHECK (
    	"situationNotaFiscal" = '0' OR
        "situationNotaFiscal" = '1' OR
        "situationNotaFiscal" = '2' OR
        "situationNotaFiscal" = '3'
    );
    
COMMENT ON COLUMN $1:name.log_nota_fiscal."situationNotaFiscal" IS '0 = Todas; 1 = Autorizadas; 2 = Canceladas; 3 = Inutilizadas';

COMMIT;