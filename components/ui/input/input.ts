import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';

export const inputVariants = cva(
  "flex h-10 w-full min-w-0 rounded-md border border-input bg-card px-3 py-2 text-base text-foreground transition-[color,box-shadow] duration-(--ds-duration-fast) ease-(--ds-easing-standard) outline-none placeholder:text-muted-fg selection:bg-primary selection:text-primary-fg focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm",
  {
    variants: {},
    defaultVariants: {},
  },
);

export type DsInputVariants = VariantProps<typeof inputVariants>;

/**
 * Applies the design system input styles to a native `<input>`.
 * Uses `aria-invalid` to switch to the destructive state.
 */
@Component({
  selector: 'input[dsInput]',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
  },
})
export class DsInputComponent {
  protected readonly classes = computed(() => inputVariants());
}
