import { Injectable, Inject } from '@nestjs/common';
import OneSignal = require('onesignal-node');
import { ONESIGNAL_MODULE_OPTIONS, TEACHER_ONSIGNAL , IOneSignalModuleOptions } from './interface/onesignal.config';


@Injectable()
export class OneSignalService {
  constructor(@Inject(ONESIGNAL_MODULE_OPTIONS) private options: IOneSignalModuleOptions) {
    if(options.name === TEACHER_ONSIGNAL){
      this.implementOneSignalTeacherSdk = new OneSignal.Client(
        this.options.appId,
        this.options.restApiKey,
      );
    }else{
      this.implementOneSignalStudentSdk = new OneSignal.Client(
        this.options.appId,
        this.options.restApiKey,
      );
    }
  }

  private readonly implementOneSignalStudentSdk: OneSignal.Client;
  private readonly implementOneSignalTeacherSdk: OneSignal.Client;

  public get studentClient(): OneSignal.Client {
    return this.implementOneSignalStudentSdk;
  }

  public get teacherClient(): OneSignal.Client {
    return this.implementOneSignalTeacherSdk;
  }
}