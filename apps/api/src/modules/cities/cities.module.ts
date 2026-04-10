import { Module } from '@nestjs/common';
import { CitysService } from './cities.service';
import { CitysController } from './cities.controller';

@Module({
  controllers: [CitysController],
  providers: [CitysService],
  exports: [CitysService],
})
export class CitysModule {}
