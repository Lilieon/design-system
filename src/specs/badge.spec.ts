import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DsBadgeComponent, type DsBadgeVariants } from '@ds/ui/badge/badge';

@Component({
  imports: [DsBadgeComponent],
  template: `<ds-badge [variant]="variant">New</ds-badge>`,
})
class TestHost {
  variant: DsBadgeVariants['variant'] = 'default';
}

describe('DsBadgeComponent', () => {
  it('applies the default variant', () => {
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('ds-badge') as HTMLElement;
    expect(badge.className).toContain('bg-primary');
    expect(badge.className).toContain('rounded-full');
    expect(badge.textContent).toContain('New');
  });

  it('applies semantic variants', () => {
    const fixture = TestBed.createComponent(TestHost);
    fixture.componentInstance.variant = 'success';
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('ds-badge') as HTMLElement;
    expect(badge.className).toContain('bg-success');
  });

  it('outline variant uses the border token', () => {
    const fixture = TestBed.createComponent(TestHost);
    fixture.componentInstance.variant = 'outline';
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('ds-badge') as HTMLElement;
    expect(badge.className).toContain('border-border');
  });
});
