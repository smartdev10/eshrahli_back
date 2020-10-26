import { Injectable, Inject } from '@nestjs/common';
import OneSignal = require('onesignal-node');
import { ONESIGNAL_MODULE_OPTIONS , IOneSignalModuleOptions } from './interface/onesignal.config';


@Injectable()
export class TeacherOneSignalService {
  constructor(@Inject(ONESIGNAL_MODULE_OPTIONS) private options: IOneSignalModuleOptions) {
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