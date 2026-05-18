import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Case } from './entities/case.entity';
import { CreateCaseDto } from './dto/create-case.dto';
import { FilterCasesDto } from './dto/filter-cases.dto';
import { paginate } from '../../common/dto/pagination.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CasesService {
  constructor(@InjectRepository(Case) private readonly repo: Repository<Case>) {}

  private generateCaseNumber(): string {
    const year = new Date().getFullYear();
    const seq = Math.floor(Math.random() * 90000) + 10000;
    return `CASE-${year}-${seq}`;
  }

  async create(dto: CreateCaseDto, user: User): Promise<Case> {
    const caseRecord = this.repo.create({
      ...dto,
      caseNumber: this.generateCaseNumber(),
      reportedById: user.id,
    } as any);
    return this.repo.save(caseRecord);
  }

  async findAll(filter: FilterCasesDto) {
    const { page = 1, limit = 20, outbreakId, zoneId, classification, status, dateFrom, dateTo } = filter;

    const qb = this.repo
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.outbreak', 'outbreak')
      .leftJoinAndSelect('c.zone', 'zone')
      .orderBy('c.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (outbreakId) qb.andWhere('c.outbreak_id = :outbreakId', { outbreakId });
    if (zoneId) qb.andWhere('c.zone_id = :zoneId', { zoneId });
    if (classification) qb.andWhere('c.classification = :classification', { classification });
    if (status) qb.andWhere('c.status = :status', { status });
    if (dateFrom) qb.andWhere('c.onset_date >= :dateFrom', { dateFrom });
    if (dateTo) qb.andWhere('c.onset_date <= :dateTo', { dateTo });

    const [items, total] = await qb.getManyAndCount();
    return paginate(items, total, page, limit);
  }

  async findOne(id: string): Promise<Case> {
    const caseRecord = await this.repo.findOne({
      where: { id },
      relations: ['outbreak', 'zone', 'reportedBy'],
    });
    if (!caseRecord) throw new NotFoundException(`Case ${id} not found`);
    return caseRecord;
  }

  async update(id: string, dto: Partial<CreateCaseDto>): Promise<Case> {
    const caseRecord = await this.findOne(id);
    Object.assign(caseRecord, dto);
    return this.repo.save(caseRecord);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.softDelete(id);
  }

  async getStatsByOutbreak(outbreakId: string) {
    const result = await this.repo
      .createQueryBuilder('c')
      .select([
        'c.classification as classification',
        'c.status as status',
        'COUNT(*) as count',
      ])
      .where('c.outbreak_id = :outbreakId', { outbreakId })
      .andWhere('c.deleted_at IS NULL')
      .groupBy('c.classification, c.status')
      .getRawMany();
    return result;
  }
}
