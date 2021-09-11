import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GoodReadsService } from './good-reads.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [GoodReadsService],
})
export class AppModule {}
