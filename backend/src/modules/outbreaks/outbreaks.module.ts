import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Outbreak } from './entities/outbreak.entity';
import { OutbreaksService } from './outbreaks.service';
import { OutbreaksController } from './outbreaks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Outbreak])],
  providers: [OutbreaksService],
  controllers: [OutbreaksController],
  exports: [OutbreaksService],
})
export class OutbreaksModule {}
