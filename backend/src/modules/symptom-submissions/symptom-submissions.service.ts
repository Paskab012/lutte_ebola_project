import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  SymptomSubmission,
  SubmissionRiskLevel,
  SubmissionProfileVisibility,
} from './entities/symptom-submission.entity';
import { CreateSymptomSubmissionDto } from './dto/create-symptom-submission.dto';
import { PaginationDto, paginate } from '../../common/dto/pagination.dto';

@Injectable()
export class SymptomSubmissionsService {
  constructor(
    @InjectRepository(SymptomSubmission)
    private readonly repo: Repository<SymptomSubmission>,
  ) {}

  async create(dto: CreateSymptomSubmissionDto): Promise<{
    reportId: string;
    riskAssessment: { level: string; score: number; requiresImmediateAction: boolean };
    alertSent: boolean;
  }> {
    const riskLevel = dto.riskAssessment.level.toUpperCase() as SubmissionRiskLevel;
    const alertTriggered = dto.riskAssessment.requiresImmediateAction;

    const submission = this.repo.create({
      symptoms: dto.symptoms,
      durationDays: dto.durationDays,
      contactWithInfected: dto.contactWithInfected,
      contactWithAnimals: dto.contactWithAnimals,
      travelToAffectedArea: dto.travelToAffectedArea,
      riskLevel,
      riskScore: dto.riskAssessment.score,
      requiresImmediateAction: dto.riskAssessment.requiresImmediateAction,
      province: dto.location?.province ?? null,
      city: dto.location?.city ?? null,
      locationDetails: dto.location?.details ?? null,
      latitude: dto.location?.coordinates?.latitude ?? null,
      longitude: dto.location?.coordinates?.longitude ?? null,
      profileVisibility:
        (dto.profileVisibility?.toUpperCase() as SubmissionProfileVisibility) ??
        SubmissionProfileVisibility.ANONYMOUS,
      alertTriggered,
    });

    const saved = await this.repo.save(submission);

    return {
      reportId: saved.id,
      riskAssessment: {
        level: dto.riskAssessment.level,
        score: dto.riskAssessment.score,
        requiresImmediateAction: dto.riskAssessment.requiresImmediateAction,
      },
      alertSent: alertTriggered,
    };
  }

  async findAll(pagination: PaginationDto) {
    const { page = 1, limit = 20 } = pagination;
    const [items, total] = await this.repo.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return paginate(items, total, page, limit);
  }

  async getStats() {
    const [total, critical, high, requiresAction] = await Promise.all([
      this.repo.count(),
      this.repo.count({ where: { riskLevel: SubmissionRiskLevel.CRITICAL } }),
      this.repo.count({ where: { riskLevel: SubmissionRiskLevel.HIGH } }),
      this.repo.count({ where: { requiresImmediateAction: true } }),
    ]);

    const byProvince = await this.repo
      .createQueryBuilder('s')
      .select(['s.province as province', 'COUNT(*) as count'])
      .where('s.province IS NOT NULL')
      .groupBy('s.province')
      .orderBy('count', 'DESC')
      .getRawMany();

    return { total, critical, high, requiresAction, byProvince };
  }
}
