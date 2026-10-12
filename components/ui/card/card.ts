import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Card container and its layout parts. Compose them manually:
 *
 * ```html
 * <ds-card>
 *   <ds-card-header>
 *     <ds-card-title>Title</ds-card-title>
 *     <ds-card-description>Description</ds-card-description>
 *   </ds-card-header>
 *   <ds-card-content>…</ds-card-content>
 *   <ds-card-footer>…</ds-card-footer>
 * </ds-card>
 * ```
 */
@Component({
  selector: 'ds-card',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'flex flex-col gap-6 rounded-lg border border-border bg-card py-6 text-card-fg shadow-sm',
  },
})
export class DsCardComponent {}

@Component({
  selector: 'ds-card-header',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-1.5 px-6' },
})
export class DsCardHeaderComponent {}

@Component({
  selector: 'ds-card-title',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'text-lg font-semibold leading-tight' },
})
export class DsCardTitleComponent {}

@Component({
  selector: 'ds-card-description',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'text-sm text-muted-fg' },
})
export class DsCardDescriptionComponent {}

@Component({
  selector: 'ds-card-content',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'px-6' },
})
export class DsCardContentComponent {}

@Component({
  selector: 'ds-card-footer',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex items-center px-6' },
})
export class DsCardFooterComponent {}
