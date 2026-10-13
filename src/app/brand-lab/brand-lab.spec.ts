import { TestBed } from '@angular/core/testing';
import { BrandLab } from './brand-lab';

// The unit-test builder does not load the global stylesheet, so the charte
// CSS variables are provided inline (values mirror tokens/brand.json).
const CHARTE_VARS: Record<string, string> = {
  '--ds-color-neutral-50': '#fafafa',
  '--ds-color-neutral-100': '#f4f4f5',
  '--ds-color-neutral-400': '#a1a1aa',
  '--ds-color-neutral-600': '#52525b',
  '--ds-color-neutral-800': '#27272a',
  '--ds-color-neutral-900': '#18181b',
  '--ds-color-neutral-950': '#09090b',
  '--ds-color-brand-500': '#3b82f6',
  '--ds-color-brand-600': '#2563eb',
  '--ds-color-danger-500': '#ef4444',
  '--ds-color-danger-600': '#dc2626',
};

describe('BrandLab', () => {
  beforeEach(async () => {
    for (const [name, value] of Object.entries(CHARTE_VARS)) {
      document.documentElement.style.setProperty(name, value);
    }
    await TestBed.configureTestingModule({
      imports: [BrandLab],
    }).compileComponents();
  });

  afterEach(() => {
    for (const name of Object.keys(CHARTE_VARS)) {
      document.documentElement.style.removeProperty(name);
    }
  });

  it('renders the charte controls, preview and contrast badges', async () => {
    const fixture = TestBed.createComponent(BrandLab);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('input[type="color"]').length).toBe(7);
    expect(compiled.textContent).toContain('Type specimen');
    expect(compiled.textContent).toContain('WCAG AA contrast');
    expect(compiled.textContent).toContain('✓');
  });

  it('applies a charte override to the document root on picker input', async () => {
    const fixture = TestBed.createComponent(BrandLab);
    await fixture.whenStable();
    const picker = fixture.nativeElement.querySelector('input[type="color"]') as HTMLInputElement;
    picker.value = '#123456';
    picker.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(document.documentElement.style.getPropertyValue('--ds-color-brand-500')).toBe('#123456');
    document.documentElement.style.removeProperty('--ds-color-brand-500');
  });
});
