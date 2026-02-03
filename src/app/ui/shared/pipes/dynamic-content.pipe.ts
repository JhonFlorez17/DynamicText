import { Pipe, PipeTransform, inject } from '@angular/core';
import { DynamicContentService } from '../../../application/services/dynamic-content.service';

@Pipe({
  name: 'content',
  standalone: true,
  pure: false,
})
export class DynamicContentPipe implements PipeTransform {
  private readonly contentService = inject(DynamicContentService);

  transform(key: string): string {
    if (!key) {
      return '';
    }
    return this.contentService.get(key);
  }
}

