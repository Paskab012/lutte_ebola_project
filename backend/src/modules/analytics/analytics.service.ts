import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Case, CaseClassification, CaseStatus } from '../cases/entities/case.entity';
import { Outbreak, OutbreakStatus } from '../outbreaks/entities/outbreak.entity';
import { Alert, AlertStatus } from '../alerts/entities/alert.entity';
import { Zone } from '../zones/entities/zone.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Case) private readonly caseRepo: Repository<Case>,
    @InjectRepository(Outbreak) private readonly outbreakRepo: Repository<Outbreak>,
    @InjectRepository(Alert) private readonly alertRepo: Repository<Alert>,
    @InjectRepository(Zone) private readonly zoneRepo: Repository<Zone>,
  ) {}

  async getDashboardSummary() {
    const [activeOutbreaks, totalCases, totalDeaths, activeAlerts] = await Promise.all([
      this.outbreakRepo.count({ where: { status: OutbreakStatus.ACTIVE } }),
      this.caseRepo.count(),
      this.caseRepo.count({ where: { status: CaseStatus.DEAD } }),
      this.alertRepo.count({ where: { status: AlertStatus.ACTIVE } }),
    ]);

    const confirmedCases = await this.caseRepo.count({
      where: { classification: CaseClassification.CONFIRMED },
    });

    const recoveredCases = await this.caseRepo.count({
      where: { status: CaseStatus.RECOVERED },
    });

    const cfr = totalCases > 0 ? ((totalDeaths / totalCases) * 100).toFixed(1) : '0';

    return {
      activeOutbreaks,
      totalCases,
      confirmedCases,
      totalDeaths,
      recoveredCases,
      activeAlerts,
      caseFatalityRate: parseFloat(cfr),
    };
  }

  async getCasesByDay(outbreakId: string, days = 30) {
    const from = new Date();
    from.setDate(from.getDate() - days);

    const results = await this.caseRepo
      .createQueryBuilder('c')
      .select("DATE_TRUNC('day', c.onset_date) as day, COUNT(*) as count")
      .where('c.outbreak_id = :outbreakId', { outbreakId })
      .andWhere('c.onset_date >= :from', { from })
      .andWhere('c.deleted_at IS NULL')
      .groupBy("DATE_TRUNC('day', c.onset_date)")
      .orderBy('day', 'ASC')
      .getRawMany();

    return results;
  }

  async getCasesByZone(outbreakId: string) {
    const results = await this.caseRepo
      .createQueryBuilder('c')
      .leftJoin('c.zone', 'zone')
      .select([
        'zone.name as zone_name',
        'zone.province as province',
        'COUNT(*) as total',
        `SUM(CASE WHEN c.status = 'DEAD' THEN 1 ELSE 0 END) as deaths`,
      ])
      .where('c.outbreak_id = :outbreakId', { outbreakId })
      .andWhere('c.deleted_at IS NULL')
      .groupBy('zone.name, zone.province')
      .orderBy('total', 'DESC')
      .getRawMany();

    return results;
  }

  async getCasesByClassification(outbreakId: string) {
    const results = await this.caseRepo
      .createQueryBuilder('c')
      .select(['c.classification as classification', 'COUNT(*) as count'])
      .where('c.outbreak_id = :outbreakId', { outbreakId })
      .andWhere('c.deleted_at IS NULL')
      .groupBy('c.classification')
      .getRawMany();

    return results;
  }

  async getAgeGenderDistribution(outbreakId: string) {
    const results = await this.caseRepo
      .createQueryBuilder('c')
      .select([
        'c.gender as gender',
        `CASE
          WHEN c.age < 5 THEN '0-4'
          WHEN c.age < 15 THEN '5-14'
          WHEN c.age < 30 THEN '15-29'
          WHEN c.age < 45 THEN '30-44'
          WHEN c.age < 60 THEN '45-59'
          ELSE '60+' END as age_group`,
        'COUNT(*) as count',
      ])
      .where('c.outbreak_id = :outbreakId', { outbreakId })
      .andWhere('c.age IS NOT NULL')
      .andWhere('c.deleted_at IS NULL')
      .groupBy('c.gender, age_group')
      .getRawMany();

    return results;
  }

  async getHealthcareWorkerStats(outbreakId: string) {
    const [hwCases, hwDeaths] = await Promise.all([
      this.caseRepo.count({ where: { outbreakId, isHealthcareWorker: true } }),
      this.caseRepo.count({ where: { outbreakId, isHealthcareWorker: true, status: CaseStatus.DEAD } }),
    ]);
    return { healthcareWorkerCases: hwCases, healthcareWorkerDeaths: hwDeaths };
  }
}
