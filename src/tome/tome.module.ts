import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TomeController } from './tome.controller';
import { TomeService } from './tome.service';
import { AuthMiddleware } from '../auth/middleware/auth.middleware';

@Module({
  controllers: [TomeController],
  providers: [TomeService],
  exports: [TomeService],
})
export class TomeModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'tome', method: RequestMethod.POST },
        { path: 'tome/:id', method: RequestMethod.PUT },
        { path: 'tome/:id/add', method: RequestMethod.POST },
        { path: 'tome/:id/delete', method: RequestMethod.DELETE },
      );
  }
}
