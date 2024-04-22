import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('companies')
@ApiTags('Company')
export class CompaniesController {
  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all the companies' })
  getCompanies() {
    return 'Companies';
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific company' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBearerAuth()
  getOneCompany(@Param('id', ParseIntPipe) id: number) {
    return `Company n°${id}`;
  }
}
