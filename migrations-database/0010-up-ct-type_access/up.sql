BEGIN;

ALTER TABLE public.type_access_portals DROP CONSTRAINT "ck_type_access_portals_whatAccesses";

INSERT INTO public.type_access_portals ("idTypeAccessPortals", "whatAccesses", "nameTypeAccess")
VALUES ('164faec8-c8b9-4b34-a50b-64afc233e8ea', 'sefaz_go', 'SEFAZ GO - Portal Contribuinte');

COMMIT;