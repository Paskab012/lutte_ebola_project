import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import { typeOrmFactory } from './config/typeorm.factory';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DiseasesModule } from './modules/diseases/diseases.module';
import { OutbreaksModule } from './modules/outbreaks/outbreaks.module';
import { CasesModule } from './modules/cases/cases.module';
import { ZonesModule } from './modules/zones/zones.module';
import { AlertsModule } from './modules/alerts/alerts.module';
import { ReportsModule } from './modules/reports/reports.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { SymptomSubmissionsModule } from './modules/symptom-submissions/symptom-submissions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({ useFactory: typeOrmFactory }),
    AuthModule,
    UsersModule,
    DiseasesModule,
    OutbreaksModule,
    CasesModule,
    ZonesModule,
    AlertsModule,
    ReportsModule,
    AnalyticsModule,
    SymptomSubmissionsModule,
  ],
})
export class AppModule {}
