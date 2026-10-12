import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium [&_svg]:size-3 [&_svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-fg',
        secondary: 'border-transparent bg-secondary text-secondary-fg',
        destructive: 'border-transparent bg-destructive text-destructive-fg',
        success: 'border-transparent bg-success text-success-fg',
        warning: 'border-transparent bg-warning text-warning-fg',
        outline: 'border-border text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type DsBadgeVariants = VariantProps<typeof badgeVariants>;

@Component({
  selector: 'ds-badge',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
  },
})
export class DsBadgeComponent {
  readonly variant = input<DsBadgeVariants['variant']>('default');

  protected readonly classes = computed(() => badgeVariants({ variant: this.variant() }));
}
