import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SymptomSubmission } from './entities/symptom-submission.entity';
import { SymptomSubmissionsService } from './symptom-submissions.service';
import { SymptomSubmissionsController } from './symptom-submissions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SymptomSubmission])],
  providers: [SymptomSubmissionsService],
  controllers: [SymptomSubmissionsController],
  exports: [SymptomSubmissionsService],
})
export class SymptomSubmissionsModule {}
