import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ContentProviderPort } from '../../domain/ports/content-provider.port';
import { DynamicContentService } from '../../application/services/dynamic-content.service';

/**
 * Adaptador que implementa ContentProviderPort para cargar contenido desde CMS (mock de API)
 */
@Injectable()
export class CmsContentAdapter implements ContentProviderPort {
  constructor(
    private readonly http: HttpClient,
    private readonly contentService: DynamicContentService,
  ) {}

  async load(): Promise<void> {
    const data = await firstValueFrom(
      this.http.get<any>('/assets/cms/payments.cms.mock.json')
    );
    this.contentService.setContent(data);
  }
}
