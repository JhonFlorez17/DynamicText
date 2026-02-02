import { PaymentContext } from '../models/payment-context.type';

export abstract class ContentProviderPort {
  abstract load(context: PaymentContext): Promise<void>;
}
