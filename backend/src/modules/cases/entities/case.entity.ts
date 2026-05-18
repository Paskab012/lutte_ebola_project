import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Outbreak } from '../../outbreaks/entities/outbreak.entity';
import { Zone } from '../../zones/entities/zone.entity';
import { User } from '../../users/entities/user.entity';

export enum CaseClassification {
  SUSPECTED = 'SUSPECTED',
  PROBABLE = 'PROBABLE',
  CONFIRMED = 'CONFIRMED',
  DISCARDED = 'DISCARDED',
}

export enum CaseStatus {
  ALIVE = 'ALIVE',
  DEAD = 'DEAD',
  RECOVERED = 'RECOVERED',
  UNKNOWN = 'UNKNOWN',
}

export enum CaseGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNKNOWN = 'UNKNOWN',
}

@Entity('cases')
export class Case extends BaseEntity {
  @ApiProperty({ example: 'CASE-2024-00347' })
  @Column({ name: 'case_number', unique: true })
  caseNumber: string;

  @ManyToOne(() => Outbreak, { eager: true })
  @JoinColumn({ name: 'outbreak_id' })
  outbreak: Outbreak;

  @Column({ name: 'outbreak_id' })
  outbreakId: string;

  @ManyToOne(() => Zone, { eager: true, nullable: true })
  @JoinColumn({ name: 'zone_id' })
  zone: Zone;

  @Column({ name: 'zone_id', nullable: true })
  zoneId: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'reported_by_id' })
  reportedBy: User;

  @Column({ name: 'reported_by_id', nullable: true })
  reportedById: string;

  // Patient info (de-identified — no direct PII stored)
  @ApiProperty({ example: 34, description: 'Patient age in years' })
  @Column({ nullable: true })
  age: number;

  @ApiProperty({ enum: CaseGender })
  @Column({ type: 'enum', enum: CaseGender, default: CaseGender.UNKNOWN })
  gender: CaseGender;

  @ApiProperty({ example: 'Mongbwalu, Ituri', description: 'Village/neighborhood (no names)' })
  @Column({ nullable: true })
  locality: string;

  @ApiProperty({ enum: CaseClassification })
  @Column({ type: 'enum', enum: CaseClassification, default: CaseClassification.SUSPECTED })
  classification: CaseClassification;

  @ApiProperty({ enum: CaseStatus })
  @Column({ type: 'enum', enum: CaseStatus, default: CaseStatus.UNKNOWN })
  status: CaseStatus;

  @ApiProperty()
  @Column({ name: 'onset_date', type: 'date', nullable: true })
  onsetDate: Date;

  @ApiProperty()
  @Column({ name: 'notification_date', type: 'date', nullable: true })
  notificationDate: Date;

  @ApiProperty()
  @Column({ name: 'hospitalization_date', type: 'date', nullable: true })
  hospitalizationDate: Date;

  @ApiProperty()
  @Column({ name: 'outcome_date', type: 'date', nullable: true })
  outcomeDate: Date;

  @ApiProperty({ example: 'Centre de Traitement Ebola Butembo' })
  @Column({ name: 'treatment_center', nullable: true })
  treatmentCenter: string;

  @ApiProperty({ type: [String], example: ['fever', 'hemorrhage'] })
  @Column({ type: 'jsonb', nullable: true })
  symptoms: string[];

  @ApiProperty({ example: true })
  @Column({ name: 'has_contact_with_case', nullable: true })
  hasContactWithCase: boolean;

  @ApiProperty({ example: true })
  @Column({ name: 'is_healthcare_worker', nullable: true })
  isHealthcareWorker: boolean;

  @ApiProperty({ type: 'text', nullable: true })
  @Column({ type: 'text', nullable: true })
  notes: string;

  @ApiProperty()
  @Column({ name: 'lab_result_date', type: 'date', nullable: true })
  labResultDate: Date;

  @ApiProperty({ example: 'POSITIVE' })
  @Column({ name: 'lab_result', nullable: true })
  labResult: string;
}
