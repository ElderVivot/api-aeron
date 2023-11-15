CREATE TABLE IF NOT EXISTS $1:name.certificate(
    "idCertificate" UUID NOT NULL,
    "idCompanie" UUID NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    "password" VARCHAR NOT NULL,
    "commomName" VARCHAR NOT NULL,
    "startDateValidity" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    "endDateValidity" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    "nameCert" VARCHAR NOT NULL,
    "federalRegistration" VARCHAR(20) NOT NULL,
    "eCpfCnpj" VARCHAR(7) NOT NULL,
    "urlSaved" VARCHAR NOT NULL,    

    CONSTRAINT pk_certificate PRIMARY KEY("idCertificate"),
    CONSTRAINT "fk_certificate_idCompanie" FOREIGN KEY("idCompanie") REFERENCES $1:name.companie("idCompanie"),
    CONSTRAINT "ck_certificate_eCpfCnpj" CHECK (
        "eCpfCnpj" = 'eCPF' OR
        "eCpfCnpj" = 'eCNPJ'
    )
);