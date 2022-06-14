import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuteursController } from './auteurs.controller';
import { AuteursService } from './auteurs.service';
import { AuthMiddleware } from '../auth/middleware/auth.middleware';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [AuteursController],
  providers: [AuteursService],
  exports: [AuteursService],
  imports: [UsersModule],
})
export class AuteursModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'auteurs', method: RequestMethod.POST },
        { path: 'auteurs/:id', method: RequestMethod.PUT },
      );
  }
}
