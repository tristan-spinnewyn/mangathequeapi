import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AvisController } from './avis.controller';
import { AvisService } from './avis.service';
import { AuthMiddleware } from '../auth/middleware/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avis } from './avis.entity';
import { Tome } from '../tome/tome.entity';
import { User } from '../users/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [AvisController],
  providers: [AvisService],
  exports: [AvisService],
  imports: [TypeOrmModule.forFeature([Avis, Tome, User]), UsersModule],
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
