import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Form label bound to an input through the native `for` attribute.
 */
@Component({
  selector: 'ds-label',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'flex select-none items-center gap-2 text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
  },
})
export class DsLabelComponent {}
