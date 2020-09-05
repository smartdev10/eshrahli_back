import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherModule } from './teachers/teachers.module';
import { StudentModule } from './students/students.module';
import { RequestModule } from './requests/requests.module';
import { NationalityModule } from './nationalities/nationalities.module';
import { SubjectsModule } from './subjects/subjects.module';
import { PageModule } from './pages/pages.module';
import { LevelsModule } from './levels/levels.module';
import { CouponModule } from './coupons/coupons.module';
import { CityModule } from './cities/cities.module';
import { MessageModule } from './messages/messages.module';
import { ConfigModule } from '@nestjs/config';
import { FavoriteModule } from './favorites/favorites.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthAdminModule } from './authAdmin/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.development.env'
    }),
    TeacherModule,
    StudentModule,
    RequestModule,
    NationalityModule,
    SubjectsModule,
    PageModule,
    LevelsModule,
    CouponModule,
    CityModule,
    MessageModule,
    FavoriteModule,
    AuthAdminModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [  __dirname + '/entities/*.*.js' ],
      synchronize: true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'build'),
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
