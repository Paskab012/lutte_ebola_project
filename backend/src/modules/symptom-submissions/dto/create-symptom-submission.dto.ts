import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SubmissionProfileVisibility, SubmissionRiskLevel } from '../entities/symptom-submission.entity';

class RiskAssessmentDto {
  @ApiProperty({ enum: SubmissionRiskLevel })
  @IsEnum(SubmissionRiskLevel)
  level: SubmissionRiskLevel;

  @ApiProperty({ example: 72, minimum: 0, maximum: 100 })
  @IsNumber()
  @Min(0)
  @Max(100)
  score: number;

  @ApiProperty()
  @IsBoolean()
  requiresImmediateAction: boolean;
}

class LocationDto {
  @ApiPropertyOptional({ example: 'Nord-Kivu' })
  @IsOptional()
  @IsString()
  province?: string;

  @ApiPropertyOptional({ example: 'Butembo' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  details?: string;

  @ApiPropertyOptional({ example: { latitude: 0.139, longitude: 29.286 } })
  @IsOptional()
  coordinates?: { latitude: number; longitude: number } | null;
}

export class CreateSymptomSubmissionDto {
  @ApiProperty({ type: [String], example: ['fever', 'headache', 'myalgia'] })
  @IsArray()
  @IsString({ each: true })
  symptoms: string[];

  @ApiProperty({ example: 5, minimum: 1, maximum: 21 })
  @IsNumber()
  @Min(1)
  @Max(21)
  durationDays: number;

  @ApiProperty()
  @IsBoolean()
  contactWithInfected: boolean;

  @ApiProperty()
  @IsBoolean()
  contactWithAnimals: boolean;

  @ApiProperty()
  @IsBoolean()
  travelToAffectedArea: boolean;

  @ApiProperty({ type: RiskAssessmentDto })
  @IsNotEmpty()
  @Type(() => RiskAssessmentDto)
  riskAssessment: RiskAssessmentDto;

  @ApiPropertyOptional({ enum: SubmissionProfileVisibility, default: SubmissionProfileVisibility.ANONYMOUS })
  @IsOptional()
  @IsEnum(SubmissionProfileVisibility)
  profileVisibility?: SubmissionProfileVisibility;

  @ApiPropertyOptional({ type: LocationDto })
  @IsOptional()
  @Type(() => LocationDto)
  location?: LocationDto;
}
