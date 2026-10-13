import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  DsAlertComponent,
  DsAlertDescriptionComponent,
  DsAlertTitleComponent,
  DsBadgeComponent,
  DsButtonComponent,
  DsCardComponent,
  DsCardContentComponent,
  DsCardDescriptionComponent,
  DsCardHeaderComponent,
  DsCardTitleComponent,
  DsInputComponent,
  DsLabelComponent,
} from '@ds/ui';

interface ColorControl {
  label: string;
  /** CSS variable (charte primitive) the picker overrides. */
  variable: string;
}

const COLOR_CONTROLS: ColorControl[] = [
  { label: 'Accent 500', variable: '--ds-color-brand-500' },
  { label: 'Accent 600 (main accent)', variable: '--ds-color-brand-600' },
  { label: 'Accent 700', variable: '--ds-color-brand-700' },
  { label: 'Surface 50 (page background)', variable: '--ds-color-neutral-50' },
  { label: 'Surface 100 (muted)', variable: '--ds-color-neutral-100' },
  { label: 'Ink 900 (primary surfaces)', variable: '--ds-color-neutral-900' },
  { label: 'Ink 950 (text / dark bg)', variable: '--ds-color-neutral-950' },
];

const FONT_OPTIONS = [
  { label: 'Inter (sans)', stack: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif' },
  { label: 'Georgia (serif)', stack: 'Georgia, Cambria, "Times New Roman", serif' },
  { label: 'System rounded', stack: 'ui-rounded, "SF Pro Rounded", system-ui, sans-serif' },
  { label: 'Monospace', stack: 'ui-monospace, "SFMono-Regular", Menlo, monospace' },
];

/** [label, fg ramp ref, bg ramp ref] evaluated in each theme mode. */
const CONTRAST_MODEL: { mode: 'light' | 'dark'; pairs: [string, string, string][] }[] = [
  {
    mode: 'light',
    pairs: [
      ['Text / page', 'neutral.950', 'neutral.50'],
      ['Muted text / muted', 'neutral.600', 'neutral.100'],
      ['On primary', 'neutral.50', 'neutral.900'],
      ['On accent', 'neutral.50', 'brand.600'],
      ['On destructive', 'neutral.50', 'danger.600'],
    ],
  },
  {
    mode: 'dark',
    pairs: [
      ['Text / page', 'neutral.50', 'neutral.950'],
      ['Muted text / muted', 'neutral.400', 'neutral.800'],
      ['On primary', 'neutral.900', 'neutral.50'],
      ['On accent', 'neutral.950', 'brand.500'],
      ['On destructive', 'neutral.950', 'danger.500'],
    ],
  },
];

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
    DsCardHeaderComponent,
    DsCardTitleComponent,
    DsInputComponent,
    DsLabelComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './brand-lab.html',
})
export class BrandLab {
  protected readonly colorControls = COLOR_CONTROLS;
  protected readonly fontOptions = FONT_OPTIONS;

  /** charte primitive overrides (var name → value) applied to :root. */
  protected readonly overrides = signal<Record<string, string>>({});
  protected readonly radius = signal(8);
  protected readonly duration = signal(180);
  protected readonly fontStack = signal(FONT_OPTIONS[0].stack);
  protected readonly copied = signal(false);

  private readonly initial = new Map<string, string>();

  constructor() {
    const styles = getComputedStyle(document.documentElement);
    for (const control of COLOR_CONTROLS) {
      this.initial.set(control.variable, styles.getPropertyValue(control.variable).trim());
    }
    for (const model of CONTRAST_MODEL) {
      for (const [, fgRef, bgRef] of model.pairs) {
        for (const ref of [fgRef, bgRef]) {
          const variable = `--ds-color-${ref.replace('.', '-')}`;
          if (!this.initial.has(variable)) {
            this.initial.set(variable, styles.getPropertyValue(variable).trim());
          }
        }
      }
    }
  }

  protected readonly contrast = computed(() =>
    CONTRAST_MODEL.map(({ mode, pairs }) => ({
      mode,
      rows: pairs.map(([label, fgRef, bgRef]) => {
        const ratio = this.ratioFor(fgRef, bgRef);
        return { label, ratio, pass: ratio >= 4.5 };
      }),
    })),
  );

  protected onColor(control: ColorControl, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.overrides.update((current) => ({ ...current, [control.variable]: value }));
    document.documentElement.style.setProperty(control.variable, value);
  }

  protected onRadius(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.radius.set(value);
    const scale: [string, number][] = [
      ['--ds-radius-sm', Math.max(0, value - 2)],
      ['--ds-radius-md', value],
      ['--ds-radius-lg', value + 4],
      ['--ds-radius-xl', value + 8],
    ];
    for (const [name, px] of scale) {
      document.documentElement.style.setProperty(name, `${px}px`);
    }
  }

  protected onDuration(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.duration.set(value);
    document.documentElement.style.setProperty('--ds-duration-fast', `${Math.round(value * 0.65)}ms`);
    document.documentElement.style.setProperty('--ds-duration-base', `${value}ms`);
    document.documentElement.style.setProperty('--ds-duration-slow', `${Math.round(value * 1.55)}ms`);
  }

  protected onFont(stack: string): void {
    this.fontStack.set(stack);
    document.documentElement.style.setProperty('--ds-font-sans', stack);
  }

  protected async copyCss(): Promise<void> {
    const lines = [
      '/* Brand Lab export — transpose these values into tokens/brand.json */',
      ':root {',
      ...Object.entries(this.overrides()).map(([name, value]) => `  ${name}: ${value};`),
      `  --ds-radius-md: ${this.radius()}px; /* sm ${Math.max(0, this.radius() - 2)} / lg ${this.radius() + 4} / xl ${this.radius() + 8} */`,
      `  --ds-duration-base: ${this.duration()}ms;`,
      `  --ds-font-sans: ${this.fontStack()};`,
      '}',
    ];
    await navigator.clipboard.writeText(lines.join('\n'));
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  protected reset(): void {
    const rootStyle = document.documentElement.style;
    for (const name of [
      ...Object.keys(this.overrides()),
      '--ds-radius-sm',
      '--ds-radius-md',
      '--ds-radius-lg',
      '--ds-radius-xl',
      '--ds-duration-fast',
      '--ds-duration-base',
      '--ds-duration-slow',
      '--ds-font-sans',
    ]) {
      rootStyle.removeProperty(name);
    }
    this.overrides.set({});
    this.radius.set(8);
    this.duration.set(180);
    this.fontStack.set(FONT_OPTIONS[0].stack);
  }

  protected currentValue(control: ColorControl): string {
    return this.overrides()[control.variable] ?? this.initial.get(control.variable) ?? '#000000';
  }

  private prim(ref: string): string {
    const variable = `--ds-color-${ref.replace('.', '-')}`;
    return this.overrides()[variable] ?? this.initial.get(variable) ?? '#000000';
  }

  // shortcut: WCAG math duplicated from scripts/check-contrast.mjs (browser build cannot import Node scripts)
  private ratioFor(fgRef: string, bgRef: string): number {
    const channel = (hex: string) => {
      const n = hex.replace('#', '');
      if (n.length < 6) return null;
      return [0, 2, 4]
        .map((i) => parseInt(n.slice(i, i + 2), 16) / 255)
        .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    };
    const luminance = (hex: string) => {
      const [r, g, b] = channel(hex) ?? [0, 0, 0];
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const [a, b] = [luminance(this.prim(fgRef)), luminance(this.prim(bgRef))].sort((x, y) => y - x);
    return Math.round(((a + 0.05) / (b + 0.05)) * 100) / 100;
  }
}
