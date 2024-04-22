import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProductsService } from './services/products/products.service';
import { ProductsController } from './controllers/products/products.controller';
import { LoggerMiddleware } from 'src/shared/middlewares/logger/logger.middleware';
import { CompaniesController } from './controllers/companies/companies.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [ProductsService],
  controllers: [ProductsController, CompaniesController],
})
export class SalesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(ProductsController);
  }
}
