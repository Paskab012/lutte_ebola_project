import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Outbreak, OutbreakStatus } from './entities/outbreak.entity';
import { CreateOutbreakDto } from './dto/create-outbreak.dto';
import { PaginationDto, paginate } from '../../common/dto/pagination.dto';

@Injectable()
export class OutbreaksService {
  constructor(@InjectRepository(Outbreak) private readonly repo: Repository<Outbreak>) {}

  async create(dto: CreateOutbreakDto): Promise<Outbreak> {
    return this.repo.save(this.repo.create(dto as any));
  }

  async findAll(pagination: PaginationDto) {
    const { page = 1, limit = 20 } = pagination;
    const [items, total] = await this.repo.findAndCount({
      relations: ['disease'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return paginate(items, total, page, limit);
  }

  async findActive() {
    return this.repo.find({
      where: { status: OutbreakStatus.ACTIVE },
      relations: ['disease'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Outbreak> {
    const outbreak = await this.repo.findOne({ where: { id }, relations: ['disease'] });
    if (!outbreak) throw new NotFoundException(`Outbreak ${id} not found`);
    return outbreak;
  }

  async update(id: string, dto: Partial<CreateOutbreakDto>): Promise<Outbreak> {
    const outbreak = await this.findOne(id);
    Object.assign(outbreak, dto);
    return this.repo.save(outbreak);
  }

  async updateStats(id: string, stats: { totalCases?: number; totalDeaths?: number; totalRecovered?: number }): Promise<Outbreak> {
    const outbreak = await this.findOne(id);
    Object.assign(outbreak, stats);
    return this.repo.save(outbreak);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.softDelete(id);
  }
}
