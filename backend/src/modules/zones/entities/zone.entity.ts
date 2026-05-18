import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../common/entities/base.entity';

export enum ZoneRiskLevel {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MODERATE = 'MODERATE',
  LOW = 'LOW',
  SAFE = 'SAFE',
}

export enum ZoneType {
  HEALTH_ZONE = 'HEALTH_ZONE',
  DISTRICT = 'DISTRICT',
  PROVINCE = 'PROVINCE',
  BORDER = 'BORDER',
}

@Entity('zones')
export class Zone extends BaseEntity {
  @ApiProperty({ example: 'Zone de Santé de Mongbwalu' })
  @Column()
  name: string;

  @ApiProperty({ example: 'Ituri' })
  @Column()
  province: string;

  @ApiProperty({ example: 'Mongbwalu' })
  @Column({ nullable: true })
  territory: string;

  @ApiProperty({ enum: ZoneType })
  @Column({ type: 'enum', enum: ZoneType, default: ZoneType.HEALTH_ZONE })
  type: ZoneType;

  @ApiProperty({ enum: ZoneRiskLevel })
  @Column({ name: 'risk_level', type: 'enum', enum: ZoneRiskLevel, default: ZoneRiskLevel.SAFE })
  riskLevel: ZoneRiskLevel;

  @ApiProperty({ example: 1.6523, description: 'Latitude' })
  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude: number;

  @ApiProperty({ example: 30.0513, description: 'Longitude' })
  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude: number;

  @ApiProperty({ example: 250000, description: 'Population served' })
  @Column({ nullable: true })
  population: number;

  @ApiProperty({ example: 3, description: 'Number of health facilities' })
  @Column({ name: 'health_facilities_count', nullable: true })
  healthFacilitiesCount: number;

  @ApiProperty()
  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
