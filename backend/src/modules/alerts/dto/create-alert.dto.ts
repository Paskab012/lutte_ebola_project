import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { AlertSeverity, AlertType } from '../entities/alert.entity';

export class CreateAlertDto {
  @ApiProperty({ example: 'Nouveau cluster confirmé — Mongbwalu' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiPropertyOptional({ enum: AlertSeverity, default: AlertSeverity.MODERATE })
  @IsOptional()
  @IsEnum(AlertSeverity)
  severity?: AlertSeverity;

  @ApiPropertyOptional({ enum: AlertType, default: AlertType.GENERAL })
  @IsOptional()
  @IsEnum(AlertType)
  type?: AlertType;

  @ApiPropertyOptional({ description: 'Outbreak UUID' })
  @IsOptional()
  @IsUUID()
  outbreakId?: string;

  @ApiPropertyOptional({ description: 'Zone UUID' })
  @IsOptional()
  @IsUUID()
  zoneId?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}
