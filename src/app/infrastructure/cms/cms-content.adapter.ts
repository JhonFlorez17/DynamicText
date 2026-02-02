import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { ContentProviderPort } from '../../domain/ports/content-provider.port';
import { PaymentContext } from '../../domain/models/payment-context.type';

@Injectable()
export class CmsContentAdapter extends ContentProviderPort {
  constructor(
    private readonly http: HttpClient,
    private readonly translate: TranslateService,
  ) {
    super();
  }

  async load(context: PaymentContext): Promise<void> {
    const data = await firstValueFrom(
      this.http.get<any>('/assets/cms/payments.cms.mock.json')
    );

    this.translate.setTranslation(
      'payments',
      {
        PAYMENTS: {
          TITLE: data[context].TITLE,
          SUBTITLE: data[context].SUBTITLE,
          MANUAL: data.SHARED.MANUAL,
          MASSIVE: data.SHARED.MASSIVE,
        },
      },
      true,
    );
    
    this.translate.use('payments');
  }
}
