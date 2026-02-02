import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentsEntryComponent } from '../../shared/components/payment-section/payments-entry.component';
import { PaymentContext } from '../../../domain/models/payment-context.type';
import { ContentConfigService } from '../../../application/services/content-config.service';

@Component({
  selector: 'app-payments-page',
  standalone: true,
  imports: [PaymentsEntryComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div class="max-w-6xl mx-auto px-4">
        <app-payments-entry [context]="paymentContext()"></app-payments-entry>
      </div>
    </div>
  `,
})
export class PaymentsPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly configService = inject(ContentConfigService);

  paymentContext = signal<PaymentContext>('PAYROLL');

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const provider = params['provider'] as string; // 'i18n' o 'cms'
      const context = params['context'] as string; // 'payroll' o 'suppliers'

      // Validar y configurar el proveedor
      if (provider === 'cms') {
        this.configService.setProviderType('CMS');
      } else if (provider === 'i18n') {
        this.configService.setProviderType('I18N');
      } else {
        // Ruta inválida, redirigir a i18n/payroll por defecto
        this.router.navigate(['/i18n/payroll']);
        return;
      }

      // Validar y configurar el contexto
      if (context === 'suppliers') {
        this.paymentContext.set('SUPPLIERS');
      } else if (context === 'payroll') {
        this.paymentContext.set('PAYROLL');
      } else {
        // Contexto inválido, redirigir a payroll
        this.router.navigate([`/${provider}/payroll`]);
        return;
      }
    });
  }
}

