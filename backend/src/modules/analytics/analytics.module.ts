import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { Case } from '../cases/entities/case.entity';
import { Outbreak } from '../outbreaks/entities/outbreak.entity';
import { Alert } from '../alerts/entities/alert.entity';
import { Zone } from '../zones/entities/zone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Case, Outbreak, Alert, Zone])],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
})
export class AnalyticsModule {}
