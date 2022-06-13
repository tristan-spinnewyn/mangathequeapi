import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EditeursModule } from './editeurs/editeurs.module';
import { AuteursModule } from './auteurs/auteurs.module';
import { SeriesModule } from './series/series.module';
import { EditionModule } from './edition/edition.module';
import { TomeModule } from './tome/tome.module';
import { AvisModule } from './avis/avis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    EditeursModule,
    AuteursModule,
    SeriesModule,
    EditionModule,
    TomeModule,
    AvisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
