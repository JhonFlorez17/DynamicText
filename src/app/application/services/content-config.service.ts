import { Injectable, signal, computed } from '@angular/core';
import { ContentProviderType } from '../../domain/models/content-provider-type.type';

@Injectable({ providedIn: 'root' })
export class ContentConfigService {
  private readonly providerType = signal<ContentProviderType>('I18N');

  readonly currentProvider = computed(() => this.providerType());

  getProviderType(): ContentProviderType {
    return this.providerType();
  }

  setProviderType(type: ContentProviderType): void {
    this.providerType.set(type);
  }

  isCms(): boolean {
    return this.providerType() === 'CMS';
  }

  isI18n(): boolean {
    return this.providerType() === 'I18N';
  }
}

