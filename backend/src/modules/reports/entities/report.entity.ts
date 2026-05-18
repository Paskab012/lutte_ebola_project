import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Outbreak } from '../../outbreaks/entities/outbreak.entity';
import { User } from '../../users/entities/user.entity';

export enum ReportType {
  DAILY_SITREP = 'DAILY_SITREP',
  WEEKLY_EPIDEMIOLOGY = 'WEEKLY_EPIDEMIOLOGY',
  CASE_INVESTIGATION = 'CASE_INVESTIGATION',
  LAB_RESULTS = 'LAB_RESULTS',
  CONTACT_TRACING = 'CONTACT_TRACING',
  BURIAL_SAFE = 'BURIAL_SAFE',
  VACCINATION = 'VACCINATION',
}

export enum ReportStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  VALIDATED = 'VALIDATED',
  PUBLISHED = 'PUBLISHED',
}

@Entity('reports')
export class Report extends BaseEntity {
  @ApiProperty({ example: 'Situation Report — Jour 42' })
  @Column()
  title: string;

  @ApiProperty({ enum: ReportType })
  @Column({ type: 'enum', enum: ReportType, default: ReportType.DAILY_SITREP })
  type: ReportType;

  @ApiProperty({ enum: ReportStatus })
  @Column({ type: 'enum', enum: ReportStatus, default: ReportStatus.DRAFT })
  status: ReportStatus;

  @ManyToOne(() => Outbreak, { nullable: true })
  @JoinColumn({ name: 'outbreak_id' })
  outbreak: Outbreak;

  @Column({ name: 'outbreak_id', nullable: true })
  outbreakId: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({ name: 'author_id', nullable: true })
  authorId: string;

  @ApiProperty()
  @Column({ name: 'report_date', type: 'date' })
  reportDate: Date;

  @ApiProperty()
  @Column({ type: 'jsonb', nullable: true, comment: 'Structured epidemiological data snapshot' })
  data: Record<string, any>;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  summary: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  recommendations: string;

  @ApiProperty()
  @Column({ name: 'submitted_at', nullable: true })
  submittedAt: Date;

  @ApiProperty()
  @Column({ name: 'published_at', nullable: true })
  publishedAt: Date;
}
