import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  templateUrl: './gallery.html',
})
export class Gallery {}
