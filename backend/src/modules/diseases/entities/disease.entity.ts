import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../common/entities/base.entity';

export enum DiseaseStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ERADICATED = 'ERADICATED',
}

@Entity('diseases')
export class Disease extends BaseEntity {
  @ApiProperty({ example: 'Ebola Virus Disease' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ example: 'EVD' })
  @Column({ unique: true })
  code: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ example: 'Ebolavirus' })
  @Column({ nullable: true })
  pathogen: string;

  @ApiProperty({ example: 2, description: 'Incubation period in days (min)' })
  @Column({ name: 'incubation_min_days', nullable: true })
  incubationMinDays: number;

  @ApiProperty({ example: 21, description: 'Incubation period in days (max)' })
  @Column({ name: 'incubation_max_days', nullable: true })
  incubationMaxDays: number;

  @ApiProperty({ example: 0.4, description: 'Case fatality rate (0-1)' })
  @Column({ name: 'case_fatality_rate', type: 'decimal', precision: 5, scale: 4, nullable: true })
  caseFatalityRate: number;

  @ApiProperty({ type: [String], example: ['fever', 'hemorrhage'] })
  @Column({ type: 'jsonb', nullable: true })
  symptoms: string[];

  @ApiProperty({ type: [String], example: ['isolation', 'PPE'] })
  @Column({ name: 'prevention_measures', type: 'jsonb', nullable: true })
  preventionMeasures: string[];

  @ApiProperty({ enum: DiseaseStatus })
  @Column({ type: 'enum', enum: DiseaseStatus, default: DiseaseStatus.ACTIVE })
  status: DiseaseStatus;

  @ApiProperty()
  @Column({ name: 'is_notifiable', default: true })
  isNotifiable: boolean;

  @ApiProperty({ example: 'https://www.who.int/health-topics/ebola' })
  @Column({ name: 'who_reference_url', nullable: true })
  whoReferenceUrl: string;
}
