import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, Query, ParseUUIDPipe, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';
import { CasesService } from './cases.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { FilterCasesDto } from './dto/filter-cases.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('cases')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.EPIDEMIOLOGIST)
  @ApiOperation({ summary: 'Register a new case (suspected/confirmed/etc.)' })
  create(@Body() dto: CreateCaseDto, @CurrentUser() user: User) {
    return this.casesService.create(dto, user);
  }

  @Get()
  @ApiOperation({ summary: 'List cases with filtering and pagination' })
  findAll(@Query() filter: FilterCasesDto) {
    return this.casesService.findAll(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get case details' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.casesService.findOne(id);
  }

  @Get('stats/outbreak/:outbreakId')
  @ApiOperation({ summary: 'Get case statistics grouped by classification & status for an outbreak' })
  @ApiParam({ name: 'outbreakId', type: 'string', format: 'uuid' })
  getStatsByOutbreak(@Param('outbreakId', ParseUUIDPipe) outbreakId: string) {
    return this.casesService.getStatsByOutbreak(outbreakId);
  }

  @Patch(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.EPIDEMIOLOGIST)
  @ApiOperation({ summary: 'Update case record (classification, status, lab result…)' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: CreateCaseDto) {
    return this.casesService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ApiOperation({ summary: 'Remove case record (soft delete)' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.casesService.remove(id);
  }
}
