import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-[color,background-color,border-color,box-shadow] duration-(--ds-duration-fast) ease-(--ds-easing-standard) outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-fg hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-fg hover:bg-secondary/80',
        outline: 'border border-input bg-card text-foreground hover:bg-muted',
        ghost: 'text-foreground hover:bg-muted',
        destructive: 'bg-destructive text-destructive-fg hover:bg-destructive/90',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-11 px-6 text-base',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export type DsButtonVariants = VariantProps<typeof buttonVariants>;

/**
 * Applies the design system button styles to a native `<button>` or `<a>`.
 * The native element stays in the consumer's template, so accessibility and
 * form semantics remain under their control.
 *
 * shortcut: the host [class] binding merges classes on runtime variant
 * switches (old classes are not removed); set the variant before first render.
 */
@Component({
  selector: 'button[dsButton], a[dsButton]',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    '[attr.data-variant]': 'variant()',
  },
})
export class DsButtonComponent {
  readonly variant = input<DsButtonVariants['variant']>('primary');
  readonly size = input<DsButtonVariants['size']>('md');

  protected readonly classes = computed(() =>
    buttonVariants({ variant: this.variant(), size: this.size() }),
  );
}
