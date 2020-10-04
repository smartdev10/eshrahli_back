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
import { OneSignalModule } from './onesignal/onesignal.module';
import { BidsModule } from './bids/bids.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env'
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
    TwilioModule.register({
      accountSid:process.env.TWILIO_ACCOUNT_SID,
      authToken:process.env.TWILIO_AUTH_TOKEN,
    }),
    OneSignalModule.register({
     appId:process.env.APP_ID,
     restApiKey:process.env.REST_API_KEY,
    }),
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
  providers: [],
})
export class AppModule {}
