import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SymptomSubmissionsService } from './symptom-submissions.service';
import { CreateSymptomSubmissionDto } from './dto/create-symptom-submission.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';

@ApiTags('symptom-submissions')
@Controller('symptom-submissions')
export class SymptomSubmissionsController {
  constructor(private readonly service: SymptomSubmissionsService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Submit a symptom report (no auth required)',
    description:
      'Public endpoint. Accepts the symptom assessment from the public checker, ' +
      'persists it for epidemiological surveillance, and returns a report ID.',
  })
  create(@Body() dto: CreateSymptomSubmissionDto) {
    return this.service.create(dto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.EPIDEMIOLOGIST)
  @Get()
  @ApiOperation({ summary: 'List all symptom submissions (admin only)' })
  findAll(@Query() pagination: PaginationDto) {
    return this.service.findAll(pagination);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.EPIDEMIOLOGIST)
  @Get('stats')
  @ApiOperation({ summary: 'Aggregated stats — totals by risk level and province (admin only)' })
  getStats() {
    return this.service.getStats();
  }
}
