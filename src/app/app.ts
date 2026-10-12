import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  DsAlertComponent,
  DsAlertDescriptionComponent,
  DsAlertTitleComponent,
  DsBadgeComponent,
  DsButtonComponent,
  DsCardComponent,
  DsCardContentComponent,
  DsCardDescriptionComponent,
  DsCardFooterComponent,
  DsCardHeaderComponent,
  DsCardTitleComponent,
  DsInputComponent,
  DsLabelComponent,
} from '@ds/ui';

@Component({
  imports: [
    DsAlertComponent,
    DsAlertDescriptionComponent,
    DsAlertTitleComponent,
    DsBadgeComponent,
    DsButtonComponent,
    DsCardComponent,
    DsCardContentComponent,
    DsCardDescriptionComponent,
    DsCardFooterComponent,
    DsCardHeaderComponent,
    DsCardTitleComponent,
    DsInputComponent,
    DsLabelComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
})
export class App {
  protected readonly dark = signal(false);

  protected toggleDark(): void {
    const next = !this.dark();
    this.dark.set(next);
    document.documentElement.classList.toggle('dark', next);
  }
}
