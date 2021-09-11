import { Body, Controller, Post } from '@nestjs/common';
import { GoodReadsService, BookData } from './good-reads.service';

@Controller()
export class AppController {
  constructor(private readonly goodReadsService: GoodReadsService) {}

  @Post('/search')
  search(
    @Body() body: { url: string }
  ): Promise<BookData[]> {
    console.log(body);
    
    return this.goodReadsService.search(body.url);
  }
}
