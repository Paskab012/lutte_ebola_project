import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';
import { ReportType } from '../entities/report.entity';

export class CreateReportDto {
  @ApiProperty({ example: 'Situation Report — Jour 42' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({ enum: ReportType, default: ReportType.DAILY_SITREP })
  @IsOptional()
  @IsEnum(ReportType)
  type?: ReportType;

  @ApiPropertyOptional({ description: 'Outbreak UUID' })
  @IsOptional()
  @IsUUID()
  outbreakId?: string;

  @ApiProperty({ example: '2024-08-15' })
  @IsDateString()
  reportDate: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  data?: Record<string, any>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  recommendations?: string;
}
