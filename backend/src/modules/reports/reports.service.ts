import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report, ReportStatus } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { PaginationDto, paginate } from '../../common/dto/pagination.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private readonly repo: Repository<Report>) {}

  async create(dto: CreateReportDto, user: User): Promise<Report> {
    const report = this.repo.create({ ...dto, authorId: user.id } as any);
    return this.repo.save(report);
  }

  async findAll(pagination: PaginationDto) {
    const { page = 1, limit = 20 } = pagination;
    const [items, total] = await this.repo.findAndCount({
      relations: ['outbreak', 'author'],
      order: { reportDate: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return paginate(items, total, page, limit);
  }

  async findOne(id: string): Promise<Report> {
    const report = await this.repo.findOne({ where: { id }, relations: ['outbreak', 'author'] });
    if (!report) throw new NotFoundException(`Report ${id} not found`);
    return report;
  }

  async update(id: string, dto: Partial<CreateReportDto>): Promise<Report> {
    const report = await this.findOne(id);
    Object.assign(report, dto);
    return this.repo.save(report);
  }

  async submit(id: string): Promise<Report> {
    const report = await this.findOne(id);
    report.status = ReportStatus.SUBMITTED;
    report.submittedAt = new Date();
    return this.repo.save(report);
  }

  async publish(id: string): Promise<Report> {
    const report = await this.findOne(id);
    report.status = ReportStatus.PUBLISHED;
    report.publishedAt = new Date();
    return this.repo.save(report);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.softDelete(id);
  }
}
