import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { DsButtonComponent, buttonVariants, type DsButtonVariants } from '@ds/ui/button/button';

@Component({
  imports: [DsButtonComponent],
  template: `<button dsButton [variant]="variant" [size]="size">Click me</button>`,
})
class TestHost {
  variant: DsButtonVariants['variant'] = 'primary';
  size: DsButtonVariants['size'] = 'md';
}

describe('DsButtonComponent', () => {
  function render(variant: DsButtonVariants['variant'] = 'primary', size: DsButtonVariants['size'] = 'md') {
    const fixture = TestBed.createComponent(TestHost);
    fixture.componentInstance.variant = variant;
    fixture.componentInstance.size = size;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    return { fixture, button };
  }

  it('applies primary variant classes by default', () => {
    const { button } = render();
    expect(button.className).toContain('bg-primary');
    expect(button.className).toContain('text-primary-fg');
    expect(button.getAttribute('data-variant')).toBe('primary');
  });

  it('applies the requested variant and size', () => {
    const { fixture, button } = render('outline', 'lg');
    expect(button.className).toContain('border-input');
    expect(button.className).toContain('h-11');
    expect(button.getAttribute('data-variant')).toBe('outline');
  });

  it('keeps a visible focus style and disabled handling in every variant', () => {
    for (const variant of ['primary', 'secondary', 'outline', 'ghost', 'destructive'] as const) {
      const classes = buttonVariants({ variant });
      expect(classes).toContain('focus-visible:ring-[3px]');
      expect(classes).toContain('disabled:opacity-50');
    }
  });

  it('renders content through ng-content', () => {
    const { button } = render();
    expect(button.textContent).toContain('Click me');
  });
});
