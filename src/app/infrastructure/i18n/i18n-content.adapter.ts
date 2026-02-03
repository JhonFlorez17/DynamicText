import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ContentProviderPort } from '../../domain/ports/content-provider.port';
import { DynamicContentService } from '../../application/services/dynamic-content.service';

/**
 * Adaptador que implementa ContentProviderPort para cargar contenido desde archivos i18n locales
 */
@Injectable()
export class I18nContentAdapter implements ContentProviderPort {
  constructor(
    private readonly http: HttpClient,
    private readonly contentService: DynamicContentService,
  ) {}

  async load(): Promise<void> {
    const data = await firstValueFrom(
      this.http.get<any>('./assets/i18n/payments.json')
    );


    this.contentService.setContent(data);
  }
}
