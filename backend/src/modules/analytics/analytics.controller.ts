import { Controller, Get, Param, ParseUUIDPipe, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('analytics')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Public()
  @Get('summary')
  @ApiOperation({ summary: 'Global dashboard summary — case counts, CFR, active alerts (public)' })
  getDashboardSummary() {
    return this.analyticsService.getDashboardSummary();
  }

  @Get('outbreaks/:id/cases-by-day')
  @ApiOperation({ summary: 'Epidemic curve — daily case counts over time' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiQuery({ name: 'days', required: false, type: Number, example: 30 })
  getCasesByDay(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('days') days?: number,
  ) {
    return this.analyticsService.getCasesByDay(id, days);
  }

  @Get('outbreaks/:id/cases-by-zone')
  @ApiOperation({ summary: 'Geographic distribution of cases by health zone' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  getCasesByZone(@Param('id', ParseUUIDPipe) id: string) {
    return this.analyticsService.getCasesByZone(id);
  }

  @Get('outbreaks/:id/classification-breakdown')
  @ApiOperation({ summary: 'Cases breakdown by classification (suspected/probable/confirmed)' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  getCasesByClassification(@Param('id', ParseUUIDPipe) id: string) {
    return this.analyticsService.getCasesByClassification(id);
  }

  @Get('outbreaks/:id/age-gender')
  @ApiOperation({ summary: 'Age-gender pyramid distribution' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  getAgeGenderDistribution(@Param('id', ParseUUIDPipe) id: string) {
    return this.analyticsService.getAgeGenderDistribution(id);
  }

  @Get('outbreaks/:id/healthcare-workers')
  @ApiOperation({ summary: 'Healthcare worker case and fatality statistics' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  getHealthcareWorkerStats(@Param('id', ParseUUIDPipe) id: string) {
    return this.analyticsService.getHealthcareWorkerStats(id);
  }
}
