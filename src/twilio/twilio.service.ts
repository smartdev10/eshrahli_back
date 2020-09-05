import { Injectable, Inject } from '@nestjs/common';
import Twilio = require('twilio');
import { TWILIO_CONFIG_TOKEN, TwilioConfig } from './interface/twilio.config';

@Injectable()
export class TwilioService {
  constructor(@Inject(TWILIO_CONFIG_TOKEN) private options: TwilioConfig) {
    this.implementTwilioSdk = Twilio(
      this.options.accountSid,
      this.options.authToken,
    );
  }

  private readonly implementTwilioSdk: Twilio.Twilio;

  public get client(): Twilio.Twilio {
    return this.implementTwilioSdk;
  }
}