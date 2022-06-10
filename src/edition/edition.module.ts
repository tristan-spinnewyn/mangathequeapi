import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { EditionController } from './edition.controller';
import { EditionService } from './edition.service';
import { AuthMiddleware } from '../auth/middleware/auth.middleware';

@Module({
  controllers: [EditionController],
  providers: [EditionService],
  exports: [EditionService],
})
export class EditionModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'edition', method: RequestMethod.POST },
        { path: 'edition/:id', method: RequestMethod.PUT },
        { path: 'edition/:id/add', method: RequestMethod.POST },
        { path: 'edition/:id/delete', method: RequestMethod.DELETE },
      );
  }
}
