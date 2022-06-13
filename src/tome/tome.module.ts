import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TomeController } from './tome.controller';
import { TomeService } from './tome.service';
import { AuthMiddleware } from '../auth/middleware/auth.middleware';
import { EditionModule } from '../edition/edition.module';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tome_user } from './tome_user.entity';
import { Tome } from './tome.entity';
import { AvisModule } from '../avis/avis.module';

@Module({
  controllers: [TomeController],
  providers: [TomeService],
  exports: [TomeService],
  imports: [
    forwardRef(() => EditionModule),
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([Tome_user, Tome]),
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
