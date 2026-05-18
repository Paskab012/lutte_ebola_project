import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray, IsBoolean, IsDateString, IsEnum, IsNotEmpty,
  IsNumber, IsOptional, IsString, IsUUID, Max, Min,
} from 'class-validator';
import { CaseClassification, CaseGender, CaseStatus } from '../entities/case.entity';

export class CreateCaseDto {
  @ApiProperty({ description: 'Outbreak UUID' })
  @IsUUID()
  outbreakId: string;

  @ApiPropertyOptional({ description: 'Zone UUID' })
  @IsOptional()
  @IsUUID()
  zoneId?: string;

  @ApiPropertyOptional({ example: 34 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(120)
  age?: number;

  @ApiPropertyOptional({ enum: CaseGender, default: CaseGender.UNKNOWN })
  @IsOptional()
  @IsEnum(CaseGender)
  gender?: CaseGender;

  @ApiPropertyOptional({ example: 'Mongbwalu, Ituri' })
  @IsOptional()
  @IsString()
  locality?: string;

  @ApiPropertyOptional({ enum: CaseClassification, default: CaseClassification.SUSPECTED })
  @IsOptional()
  @IsEnum(CaseClassification)
  classification?: CaseClassification;

  @ApiPropertyOptional({ enum: CaseStatus, default: CaseStatus.UNKNOWN })
  @IsOptional()
  @IsEnum(CaseStatus)
  status?: CaseStatus;

  @ApiPropertyOptional({ example: '2024-08-15' })
  @IsOptional()
  @IsDateString()
  onsetDate?: string;

  @ApiPropertyOptional({ example: '2024-08-17' })
  @IsOptional()
  @IsDateString()
  notificationDate?: string;

  @ApiPropertyOptional({ example: '2024-08-18' })
  @IsOptional()
  @IsDateString()
  hospitalizationDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  outcomeDate?: string;

  @ApiPropertyOptional({ example: 'CTE Butembo' })
  @IsOptional()
  @IsString()
  treatmentCenter?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  symptoms?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  hasContactWithCase?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isHealthcareWorker?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  labResultDate?: string;

  @ApiPropertyOptional({ example: 'POSITIVE' })
  @IsOptional()
  @IsString()
  labResult?: string;
}
