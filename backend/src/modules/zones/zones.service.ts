import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Zone } from './entities/zone.entity';
import { CreateZoneDto } from './dto/create-zone.dto';
import { PaginationDto, paginate } from '../../common/dto/pagination.dto';

@Injectable()
export class ZonesService {
  constructor(@InjectRepository(Zone) private readonly repo: Repository<Zone>) {}

  async create(dto: CreateZoneDto): Promise<Zone> {
    return this.repo.save(this.repo.create(dto));
  }

  async findAll(pagination: PaginationDto) {
    const { page = 1, limit = 20 } = pagination;
    const [items, total] = await this.repo.findAndCount({
      where: { isActive: true },
      order: { name: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return paginate(items, total, page, limit);
  }

  async findOne(id: string): Promise<Zone> {
    const zone = await this.repo.findOne({ where: { id } });
    if (!zone) throw new NotFoundException(`Zone ${id} not found`);
    return zone;
  }

  async update(id: string, dto: Partial<CreateZoneDto>): Promise<Zone> {
    const zone = await this.findOne(id);
    Object.assign(zone, dto);
    return this.repo.save(zone);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.softDelete(id);
  }
}
