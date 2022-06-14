import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TomeController } from './tome.controller';
import { TomeService } from './tome.service';
import { AuthMiddleware } from '../auth/middleware/auth.middleware';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tome_user } from './tome_user.entity';
import { Tome } from './tome.entity';
import { AvisModule } from '../avis/avis.module';
import { Edition } from '../edition/edition.entity';
import { User } from '../users/user.entity';

@Module({
  controllers: [TomeController],
  providers: [TomeService],
  exports: [TomeService],
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Tome_user, Tome, Edition, User]),
    AvisModule,
  ],
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
