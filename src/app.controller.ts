import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Hello')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get a Hello sentence' })
  @ApiParam({ name: 'params', enum: ['Param A', 'Param B', 'Param C'] })
  @ApiQuery({ name: 'query', enum: ['Query A', 'Query B', 'Query C'] })
  getHello(@Query() query: any, @Param() params: any): string {
    console.log('query');
    console.log(query);

    console.log('params');
    console.log(params);

    return this.appService.getHello();
  }
}
