import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Auth, CurrentUser } from 'src/user/user.controller';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticService: StatisticsService) {}


  @Get('main')
  @Auth()
  getMainStatistics(@CurrentUser('id') id:number) {
    return this.statisticService.getMain(id)
  }




}
