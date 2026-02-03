import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ContentConfigService } from '../../../application/services/content-config.service';
import { DynamicContentPipe } from '../../shared/pipes/dynamic-content.pipe';
import { PaymentsContentService } from '../../../application/services/payments-content.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-payments-page',
  standalone: true,
  imports: [DynamicContentPipe],
  templateUrl: './payments-page.component.html',
})
export class PaymentsPageComponent implements OnInit {
  private readonly configService = inject(ContentConfigService);
  private readonly contentService = inject(PaymentsContentService);
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    
    /* Configurar el proveedor desde el environment */
    this.configService.setProviderType(environment.contentProvider);

    /* Cargar el contenido (el contexto se toma del environment en el servicio) */
    this.contentService.loadContent().then(() => {
      /* Forzar la detección de cambios después de cargar el contenido */
      this.cdr.detectChanges();
    });
  }
}
