import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AvisController } from './avis.controller';
import { AvisService } from './avis.service';
import { AuthMiddleware } from '../auth/middleware/auth.middleware';

@Module({
  controllers: [AvisController],
  providers: [AvisService],
  exports: [AvisService],
})
export class AvisModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'avis', method: RequestMethod.POST },
        { path: 'avis/:id/signale', method: RequestMethod.PUT },
        { path: 'avis/signalee', method: RequestMethod.GET },
        { path: 'avis/:id', method: RequestMethod.DELETE },
      );
  }
}
