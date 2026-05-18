import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, Query, ParseUUIDPipe, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';
import { OutbreaksService } from './outbreaks.service';
import { CreateOutbreakDto } from './dto/create-outbreak.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('outbreaks')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('outbreaks')
export class OutbreaksController {
  constructor(private readonly outbreaksService: OutbreaksService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ApiOperation({ summary: 'Declare a new outbreak' })
  create(@Body() dto: CreateOutbreakDto) {
    return this.outbreaksService.create(dto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'List all outbreaks (public)' })
  findAll(@Query() pagination: PaginationDto) {
    return this.outbreaksService.findAll(pagination);
  }

  @Public()
  @Get('active')
  @ApiOperation({ summary: 'Get currently active outbreaks (public)' })
  findActive() {
    return this.outbreaksService.findActive();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get outbreak details (public)' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.outbreaksService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ApiOperation({ summary: 'Update outbreak record (status, severity, stats…)' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: CreateOutbreakDto) {
    return this.outbreaksService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Remove outbreak record (soft delete)' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.outbreaksService.remove(id);
  }
}
