import { Module } from '@nestjs/common'

import { AuthModule } from './modules/public/auth/auth.module'
import { CityModule } from './modules/public/city/city.module'
import { ClientModule } from './modules/public/client/client.module'
import { ClientsResumeModule } from './modules/public/clients_resume/clients_resume.module'
import { MigrationModule } from './modules/public/migrations/migration.module'
import { QueroConhecerModule } from './modules/public/quero_conhecer/quero_conhecer.module'
import { StateModule } from './modules/public/state/state.module'
import { UserClientModule } from './modules/public/user_client/user.module'
import { TAccessPortalsModule } from './modules/tenant/access_portals/access_portals.module'
import { TCertificateModule } from './modules/tenant/certificate/certificate.module'
import { TCompanieModule } from './modules/tenant/companie/companie.module'
import { TLogNfsPrefGynModule } from './modules/tenant/log_nfs_pref_gyn/log-nfs-pref-gyn.module'
import { TLogNotaFiscalGoEntModule } from './modules/tenant/log_nota_fiscal_go_ent/log-nota-fiscal.module'
import { TLogNotaFiscalModule } from './modules/tenant/log_nota_fiscal/log-nota-fiscal.module'
import { TUserPortalsHasAccessModule } from './modules/tenant/user_portals_has_access/user_portals_has_access.module'

@Module({
    imports: [
        ClientModule,
        StateModule,
        CityModule,
        UserClientModule,
        MigrationModule,
        AuthModule,
        QueroConhecerModule,
        ClientsResumeModule,
        TCompanieModule,
        TCertificateModule,
        TLogNotaFiscalModule,
        TLogNfsPrefGynModule,
        TAccessPortalsModule,
        TLogNotaFiscalGoEntModule,
        TUserPortalsHasAccessModule
    ]
})
export class AppModule { }