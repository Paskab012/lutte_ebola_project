import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert, AlertStatus } from './entities/alert.entity';
import { CreateAlertDto } from './dto/create-alert.dto';
import { PaginationDto, paginate } from '../../common/dto/pagination.dto';

@Injectable()
export class AlertsService {
  constructor(@InjectRepository(Alert) private readonly repo: Repository<Alert>) {}

  async create(dto: CreateAlertDto): Promise<Alert> {
    return this.repo.save(this.repo.create(dto as any));
  }

  async findAll(pagination: PaginationDto) {
    const { page = 1, limit = 20 } = pagination;
    const [items, total] = await this.repo.findAndCount({
      relations: ['outbreak', 'zone'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return paginate(items, total, page, limit);
  }

  async findPublicActive() {
    return this.repo.find({
      where: { isPublic: true, status: AlertStatus.ACTIVE },
      relations: ['zone'],
      order: { createdAt: 'DESC' },
      take: 10,
    });
  }

  async findOne(id: string): Promise<Alert> {
    const alert = await this.repo.findOne({ where: { id }, relations: ['outbreak', 'zone'] });
    if (!alert) throw new NotFoundException(`Alert ${id} not found`);
    return alert;
  }

  async acknowledge(id: string): Promise<Alert> {
    const alert = await this.findOne(id);
    alert.status = AlertStatus.ACKNOWLEDGED;
    alert.acknowledgedAt = new Date();
    return this.repo.save(alert);
  }

  async resolve(id: string): Promise<Alert> {
    const alert = await this.findOne(id);
    alert.status = AlertStatus.RESOLVED;
    return this.repo.save(alert);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.softDelete(id);
  }
}
