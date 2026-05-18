import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Disease } from '../../diseases/entities/disease.entity';

export enum OutbreakStatus {
  ACTIVE = 'ACTIVE',
  CONTAINED = 'CONTAINED',
  ENDED = 'ENDED',
  PHEIC = 'PHEIC', // Public Health Emergency of International Concern
}

export enum OutbreakSeverity {
  LEVEL_1 = 'LEVEL_1',
  LEVEL_2 = 'LEVEL_2',
  LEVEL_3 = 'LEVEL_3', // Most severe
}

@Entity('outbreaks')
export class Outbreak extends BaseEntity {
  @ApiProperty({ example: 'Épidémie Ebola 2024 — Nord-Kivu / Ituri' })
  @Column()
  name: string;

  @ApiProperty({ example: 'EVD-2024-DRC-14' })
  @Column({ unique: true })
  code: string;

  @ManyToOne(() => Disease, { eager: true })
  @JoinColumn({ name: 'disease_id' })
  disease: Disease;

  @Column({ name: 'disease_id' })
  diseaseId: string;

  @ApiProperty({ enum: OutbreakStatus })
  @Column({ type: 'enum', enum: OutbreakStatus, default: OutbreakStatus.ACTIVE })
  status: OutbreakStatus;

  @ApiProperty({ enum: OutbreakSeverity })
  @Column({ type: 'enum', enum: OutbreakSeverity, default: OutbreakSeverity.LEVEL_2 })
  severity: OutbreakSeverity;

  @ApiProperty()
  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @ApiProperty({ nullable: true })
  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: Date | null;

  @ApiProperty({ example: 'Nord-Kivu, Ituri' })
  @Column({ name: 'affected_provinces', type: 'jsonb', nullable: true })
  affectedProvinces: string[];

  @ApiProperty({ example: 336 })
  @Column({ name: 'total_cases', default: 0 })
  totalCases: number;

  @ApiProperty({ example: 88 })
  @Column({ name: 'total_deaths', default: 0 })
  totalDeaths: number;

  @ApiProperty({ example: 210 })
  @Column({ name: 'total_recovered', default: 0 })
  totalRecovered: number;

  @ApiProperty()
  @Column({ name: 'is_pheic', default: false })
  isPheic: boolean;

  @ApiProperty({ type: 'text', nullable: true })
  @Column({ nullable: true, type: 'text' })
  notes: string;
}
