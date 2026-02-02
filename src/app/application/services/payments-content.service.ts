import { Injectable, inject } from '@angular/core';
import { ContentProviderPort } from '../../domain/ports/content-provider.port';
import { PaymentContext } from '../../domain/models/payment-context.type';
import { ContentConfigService } from './content-config.service';
import { I18nContentAdapter } from '../../infrastructure/i18n/i18n-content.adapter';
import { CmsContentAdapter } from '../../infrastructure/cms/cms-content.adapter';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PaymentsContentService {
  private readonly configService = inject(ContentConfigService);
  private readonly translate = inject(TranslateService);
  private readonly http = inject(HttpClient);

  private getContentProvider(): ContentProviderPort {
    if (this.configService.isCms()) {
      return new CmsContentAdapter(this.http, this.translate);
    }
    return new I18nContentAdapter(this.http, this.translate);
  }

  loadContent(context: PaymentContext): Promise<void> {
    const provider = this.getContentProvider();
    return provider.load(context);
  }
}
