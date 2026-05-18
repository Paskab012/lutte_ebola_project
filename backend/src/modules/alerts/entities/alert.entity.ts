import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Outbreak } from '../../outbreaks/entities/outbreak.entity';
import { Zone } from '../../zones/entities/zone.entity';

export enum AlertSeverity {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MODERATE = 'MODERATE',
  LOW = 'LOW',
  INFO = 'INFO',
}

export enum AlertType {
  NEW_CLUSTER = 'NEW_CLUSTER',
  SURGE = 'SURGE',
  BORDER_CROSSING = 'BORDER_CROSSING',
  HEALTHCARE_WORKER = 'HEALTHCARE_WORKER',
  LAB_CONFIRMED = 'LAB_CONFIRMED',
  GENERAL = 'GENERAL',
}

export enum AlertStatus {
  ACTIVE = 'ACTIVE',
  ACKNOWLEDGED = 'ACKNOWLEDGED',
  RESOLVED = 'RESOLVED',
}

@Entity('alerts')
export class Alert extends BaseEntity {
  @ApiProperty({ example: 'Nouveau cluster confirmé — Mongbwalu' })
  @Column()
  title: string;

  @ApiProperty()
  @Column({ type: 'text' })
  message: string;

  @ApiProperty({ enum: AlertSeverity })
  @Column({ type: 'enum', enum: AlertSeverity, default: AlertSeverity.MODERATE })
  severity: AlertSeverity;

  @ApiProperty({ enum: AlertType })
  @Column({ type: 'enum', enum: AlertType, default: AlertType.GENERAL })
  type: AlertType;

  @ApiProperty({ enum: AlertStatus })
  @Column({ type: 'enum', enum: AlertStatus, default: AlertStatus.ACTIVE })
  status: AlertStatus;

  @ManyToOne(() => Outbreak, { nullable: true })
  @JoinColumn({ name: 'outbreak_id' })
  outbreak: Outbreak;

  @Column({ name: 'outbreak_id', nullable: true })
  outbreakId: string;

  @ManyToOne(() => Zone, { nullable: true })
  @JoinColumn({ name: 'zone_id' })
  zone: Zone;

  @Column({ name: 'zone_id', nullable: true })
  zoneId: string;

  @ApiProperty()
  @Column({ name: 'is_public', default: false, comment: 'Show on public-facing dashboard' })
  isPublic: boolean;

  @ApiProperty()
  @Column({ name: 'acknowledged_at', nullable: true })
  acknowledgedAt: Date;
}
