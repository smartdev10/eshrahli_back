import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
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
import { TwilioModule } from './twilio/twilio.module';
import { BidsModule } from './bids/bids.module';
import { RequestService } from './requests/requests.service';
import { SRequest } from './entities/requests.entity';
import { NotificationModule } from './notifications/notificatins.module';
import { SettingModule } from './settings/setting.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal: true
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
    BidsModule,
    SettingModule,
    NotificationModule,
    TwilioModule.register({
      accountSid:process.env.TWILIO_ACCOUNT_SID,
      authToken:process.env.TWILIO_AUTH_TOKEN,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [  __dirname + '/entities/*.*.js' ],
      synchronize: true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'build'),
    }),
    TypeOrmModule.forFeature([SRequest])
  ],
  controllers: [AppController],
  providers: [RequestService],
})
export class AppModule {}
