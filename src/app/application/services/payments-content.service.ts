import { Injectable, inject } from '@angular/core';
import { ContentProviderPort } from '../../domain/ports/content-provider.port';
import { ContentConfigService } from './content-config.service';
import { I18nContentAdapter } from '../../infrastructure/i18n/i18n-content.adapter';
import { CmsContentAdapter } from '../../infrastructure/cms/cms-content.adapter';
import { HttpClient } from '@angular/common/http';
import { DynamicContentService } from './dynamic-content.service';

@Injectable({ providedIn: 'root' })
export class PaymentsContentService {
  private readonly configService = inject(ContentConfigService);
  private readonly http = inject(HttpClient);
  private readonly contentService = inject(DynamicContentService);

  private getContentProvider(): ContentProviderPort {
    if (this.configService.isCms()) {
      return new CmsContentAdapter(this.http, this.contentService);
    }
    return new I18nContentAdapter(this.http, this.contentService);
  }

  loadContent(): Promise<void> {
    const provider = this.getContentProvider();
    return provider.load();
  }
}
