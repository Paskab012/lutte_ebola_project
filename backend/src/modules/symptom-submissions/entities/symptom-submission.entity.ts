import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../common/entities/base.entity';

export enum SubmissionRiskLevel {
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum SubmissionProfileVisibility {
  ANONYMOUS = 'ANONYMOUS',
  HIDDEN = 'HIDDEN',
  VISIBLE = 'VISIBLE',
}

export enum SubmissionStatus {
  NEW = 'NEW',
  REVIEWED = 'REVIEWED',
  RESOLVED = 'RESOLVED',
}

@Entity('symptom_submissions')
export class SymptomSubmission extends BaseEntity {
  // ── Symptoms ──────────────────────────────────────────────────────────────
  @ApiProperty({ type: [String], example: ['fever', 'headache'] })
  @Column({ type: 'jsonb' })
  symptoms: string[];

  @ApiProperty({ example: 5 })
  @Column({ name: 'duration_days' })
  durationDays: number;

  // ── Risk factors ──────────────────────────────────────────────────────────
  @ApiProperty()
  @Column({ name: 'contact_with_infected', default: false })
  contactWithInfected: boolean;

  @ApiProperty()
  @Column({ name: 'contact_with_animals', default: false })
  contactWithAnimals: boolean;

  @ApiProperty()
  @Column({ name: 'travel_to_affected_area', default: false })
  travelToAffectedArea: boolean;

  // ── Risk assessment (computed by frontend engine) ─────────────────────────
  @ApiProperty({ enum: SubmissionRiskLevel })
  @Column({ name: 'risk_level', type: 'enum', enum: SubmissionRiskLevel })
  riskLevel: SubmissionRiskLevel;

  @ApiProperty({ example: 72 })
  @Column({ name: 'risk_score' })
  riskScore: number;

  @ApiProperty()
  @Column({ name: 'requires_immediate_action', default: false })
  requiresImmediateAction: boolean;

  // ── Location (no PII — province/city level only) ───────────────────────────
  @ApiProperty({ example: 'Nord-Kivu' })
  @Column({ nullable: true })
  province: string;

  @ApiProperty({ example: 'Butembo' })
  @Column({ nullable: true })
  city: string;

  @ApiProperty({ nullable: true })
  @Column({ name: 'location_details', nullable: true })
  locationDetails: string;

  @ApiProperty({ nullable: true })
  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude: number;

  @ApiProperty({ nullable: true })
  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude: number;

  // ── Submission metadata ───────────────────────────────────────────────────
  @ApiProperty({ enum: SubmissionProfileVisibility })
  @Column({
    name: 'profile_visibility',
    type: 'enum',
    enum: SubmissionProfileVisibility,
    default: SubmissionProfileVisibility.ANONYMOUS,
  })
  profileVisibility: SubmissionProfileVisibility;

  @ApiProperty({ enum: SubmissionStatus })
  @Column({ type: 'enum', enum: SubmissionStatus, default: SubmissionStatus.NEW })
  status: SubmissionStatus;

  @ApiProperty()
  @Column({ name: 'alert_triggered', default: false })
  alertTriggered: boolean;
}
