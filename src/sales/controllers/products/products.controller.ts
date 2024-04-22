import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('products')
@ApiTags('Product')
export class ProductsController {
  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all the products' })
  getProducts() {
    return 'Products';
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific product' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBearerAuth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return `Product n°${id}`;
  }
}
