import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';

export const alertVariants = cva(
  'relative grid w-full grid-cols-[0_1fr] items-start gap-y-1 rounded-lg border border-border bg-card px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing*4)_1fr)] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
  {
    variants: {
      variant: {
        default: 'text-card-fg',
        info: 'border-blue-200 bg-blue-50 text-blue-950 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-100',
        success:
          'border-green-200 bg-green-50 text-green-950 dark:border-green-900 dark:bg-green-950 dark:text-green-100',
        warning:
          'border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100',
        destructive:
          'border-red-200 bg-red-50 text-red-950 dark:border-red-900 dark:bg-red-950 dark:text-red-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type DsAlertVariants = VariantProps<typeof alertVariants>;

@Component({
  selector: 'ds-alert',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'alert',
    '[class]': 'classes()',
  },
})
export class DsAlertComponent {
  readonly variant = input<DsAlertVariants['variant']>('default');

  protected readonly classes = computed(() => alertVariants({ variant: this.variant() }));
}

@Component({
  selector: 'ds-alert-title',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'col-start-2 min-h-4 font-medium tracking-tight' },
})
export class DsAlertTitleComponent {}

@Component({
  selector: 'ds-alert-description',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'col-start-2 grid justify-items-start gap-1 text-sm text-muted-fg [&_p]:leading-relaxed',
  },
})
export class DsAlertDescriptionComponent {}
