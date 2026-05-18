import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ZoneRiskLevel, ZoneType } from '../entities/zone.entity';

export class CreateZoneDto {
  @ApiProperty({ example: 'Zone de Santé de Mongbwalu' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Ituri' })
  @IsNotEmpty()
  @IsString()
  province: string;

  @ApiPropertyOptional({ example: 'Mongbwalu' })
  @IsOptional()
  @IsString()
  territory?: string;

  @ApiPropertyOptional({ enum: ZoneType, default: ZoneType.HEALTH_ZONE })
  @IsOptional()
  @IsEnum(ZoneType)
  type?: ZoneType;

  @ApiPropertyOptional({ enum: ZoneRiskLevel, default: ZoneRiskLevel.SAFE })
  @IsOptional()
  @IsEnum(ZoneRiskLevel)
  riskLevel?: ZoneRiskLevel;

  @ApiPropertyOptional({ example: 1.6523 })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiPropertyOptional({ example: 30.0513 })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiPropertyOptional({ example: 250000 })
  @IsOptional()
  @IsNumber()
  population?: number;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsNumber()
  healthFacilitiesCount?: number;
}
