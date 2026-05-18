import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Disease } from './entities/disease.entity';
import { CreateDiseaseDto } from './dto/create-disease.dto';
import { PaginationDto, paginate } from '../../common/dto/pagination.dto';

@Injectable()
export class DiseasesService {
  constructor(@InjectRepository(Disease) private readonly repo: Repository<Disease>) {}

  async create(dto: CreateDiseaseDto): Promise<Disease> {
    const exists = await this.repo.findOne({ where: [{ name: dto.name }, { code: dto.code }] });
    if (exists) throw new ConflictException('Disease with this name or code already exists');
    return this.repo.save(this.repo.create(dto));
  }

  async findAll(pagination: PaginationDto) {
    const { page = 1, limit = 20 } = pagination;
    const [items, total] = await this.repo.findAndCount({
      order: { name: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return paginate(items, total, page, limit);
  }

  async findOne(id: string): Promise<Disease> {
    const disease = await this.repo.findOne({ where: { id } });
    if (!disease) throw new NotFoundException(`Disease ${id} not found`);
    return disease;
  }

  async findByCode(code: string): Promise<Disease | null> {
    return this.repo.findOne({ where: { code } });
  }

  async update(id: string, dto: Partial<CreateDiseaseDto>): Promise<Disease> {
    const disease = await this.findOne(id);
    Object.assign(disease, dto);
    return this.repo.save(disease);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.softDelete(id);
  }
}
