import { Injectable, Inject } from '@nestjs/common';
import OneSignal = require('onesignal-node');
import { IOneSignalModuleOptions , STUDENT_ONSIGNAL } from './interface/onesignal.config';


@Injectable()
export class StudentOneSignalService {
  constructor(@Inject(STUDENT_ONSIGNAL) private options: IOneSignalModuleOptions) {
    this.implementOneSignalSdk = new OneSignal.Client(
      this.options.appId,
      this.options.restApiKey,
    );
  }

  private readonly implementOneSignalSdk: OneSignal.Client;

  public get client(): OneSignal.Client {
    return this.implementOneSignalSdk;
  }
  
}