import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, Query, ParseUUIDPipe, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('reports')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.EPIDEMIOLOGIST)
  @ApiOperation({ summary: 'Create a new epidemiological report (draft)' })
  create(@Body() dto: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(dto, user);
  }

  @Get()
  @ApiOperation({ summary: 'List all reports (paginated)' })
  findAll(@Query() pagination: PaginationDto) {
    return this.reportsService.findAll(pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get report details' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.EPIDEMIOLOGIST)
  @ApiOperation({ summary: 'Update report content' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: CreateReportDto) {
    return this.reportsService.update(id, dto);
  }

  @Patch(':id/submit')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.EPIDEMIOLOGIST)
  @ApiOperation({ summary: 'Submit report for review' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  submit(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportsService.submit(id);
  }

  @Patch(':id/publish')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ApiOperation({ summary: 'Publish report (makes it official)' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  publish(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportsService.publish(id);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Remove report (soft delete)' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportsService.remove(id);
  }
}
