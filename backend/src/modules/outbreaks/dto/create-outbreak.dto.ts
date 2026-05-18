import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray, IsBoolean, IsDateString, IsEnum, IsNotEmpty,
  IsOptional, IsString, IsUUID,
} from 'class-validator';
import { OutbreakSeverity, OutbreakStatus } from '../entities/outbreak.entity';

export class CreateOutbreakDto {
  @ApiProperty({ example: 'Épidémie Ebola 2024 — Nord-Kivu / Ituri' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'EVD-2024-DRC-14' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ description: 'Disease UUID' })
  @IsUUID()
  diseaseId: string;

  @ApiPropertyOptional({ enum: OutbreakStatus, default: OutbreakStatus.ACTIVE })
  @IsOptional()
  @IsEnum(OutbreakStatus)
  status?: OutbreakStatus;

  @ApiPropertyOptional({ enum: OutbreakSeverity, default: OutbreakSeverity.LEVEL_2 })
  @IsOptional()
  @IsEnum(OutbreakSeverity)
  severity?: OutbreakSeverity;

  @ApiProperty({ example: '2024-01-07' })
  @IsDateString()
  startDate: string;

  @ApiPropertyOptional({ example: '2024-06-15' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ type: [String], example: ['Nord-Kivu', 'Ituri'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  affectedProvinces?: string[];

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isPheic?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}
