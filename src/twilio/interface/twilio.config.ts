import { Twilio } from 'twilio';

export interface TwilioConfig {
  accountSid: string;
  authToken: string;
  options?: Twilio.TwilioClientOptions;
}
