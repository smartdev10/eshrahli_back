import { Twilio } from 'twilio';

export interface TwilioConfig {
  accountSid: string;
  authToken: string;
  options?: Twilio.TwilioClientOptions;
}

export const TWILIO_CONFIG_TOKEN = '__twilioCfg__';