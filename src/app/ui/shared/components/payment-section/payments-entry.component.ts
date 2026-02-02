import { Component, inject, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PaymentContext } from '../../../../domain/models/payment-context.type';
import { PaymentsContentService } from '../../../../application/services/payments-content.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-payments-entry',
  templateUrl: './payments-entry.component.html',
  standalone: true,
  imports: [TranslateModule],
})
export class PaymentsEntryComponent implements OnInit, OnChanges {
  public readonly translate = inject(TranslateService);

  @Input() context: PaymentContext = 'SUPPLIERS';

  constructor(private readonly contentService: PaymentsContentService) {}

  ngOnInit(): void {
    this.contentService.loadContent(this.context);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['context'] && !changes['context'].firstChange) {
      this.contentService.loadContent(this.context);
    }
  }

  goToManual(): void {
    console.log(`Pago manual - Contexto: ${this.context}`);
  }

  goToMassive(): void {
    console.log(`Pago masivo - Contexto: ${this.context}`);
  }
}
