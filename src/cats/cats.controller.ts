// cat.controller.ts
import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Cats')
@Controller('cats')
@ApiBearerAuth() // Add this decorator to specify authentication is required for all routes in this controller
export class CatsController {
  @Get()
  @ApiOperation({ summary: 'Get all cats' })
  findAll(): string {
    return 'Get all cats';
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get cat by ID' })
  @ApiParam({ name: 'id', description: 'Cat ID' })
  findOne(@Param('id') id: string): string {
    return `Get cat with ID ${id}`;
  }

  @Post()
  @ApiOperation({ summary: 'Create a cat' })
  create(): string {
    return 'Create a cat';
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a cat' })
  @ApiParam({ name: 'id', description: 'Cat ID' })
  update(@Param('id') id: string): string {
    return `Update cat with ID ${id}`;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cat' })
  @ApiParam({ name: 'id', description: 'Cat ID' })
  delete(@Param('id') id: string): string {
    return `Delete cat with ID ${id}`;
  }
}
