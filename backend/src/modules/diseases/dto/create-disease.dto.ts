import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { DiseaseStatus } from '../entities/disease.entity';

export class CreateDiseaseDto {
  @ApiProperty({ example: 'Ebola Virus Disease' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'EVD' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'Ebolavirus' })
  @IsOptional()
  @IsString()
  pathogen?: string;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  incubationMinDays?: number;

  @ApiPropertyOptional({ example: 21 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  incubationMaxDays?: number;

  @ApiPropertyOptional({ example: 0.4, minimum: 0, maximum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  caseFatalityRate?: number;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  symptoms?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preventionMeasures?: string[];

  @ApiPropertyOptional({ enum: DiseaseStatus, default: DiseaseStatus.ACTIVE })
  @IsOptional()
  @IsEnum(DiseaseStatus)
  status?: DiseaseStatus;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isNotifiable?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  whoReferenceUrl?: string;
}
