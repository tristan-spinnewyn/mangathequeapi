import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { EditeursController } from './editeurs.controller';
import { EditeursService } from './editeurs.service';
import { AuthMiddleware } from '../auth/middleware/auth.middleware';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [EditeursController],
  providers: [EditeursService],
  exports: [EditeursService],
  imports: [UsersModule],
})
export class EditeursModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'editeurs', method: RequestMethod.POST },
        { path: 'editeurs/:id', method: RequestMethod.PUT },
      );
  }
}
