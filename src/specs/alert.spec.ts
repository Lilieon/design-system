import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  DsAlertComponent,
  DsAlertDescriptionComponent,
  DsAlertTitleComponent,
  type DsAlertVariants,
} from '@ds/ui/alert/alert';

@Component({
  imports: [DsAlertComponent, DsAlertTitleComponent, DsAlertDescriptionComponent],
  template: `
    <ds-alert [variant]="variant">
      <ds-alert-title>Heads up!</ds-alert-title>
      <ds-alert-description>You can add components to your app.</ds-alert-description>
    </ds-alert>
  `,
})
class TestHost {
  variant: DsAlertVariants['variant'] = 'default';
}

describe('DsAlertComponent', () => {
  let alert: HTMLElement;

  beforeEach(() => {
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    alert = fixture.nativeElement.querySelector('ds-alert') as HTMLElement;
  });

  it('exposes the alert role for assistive technology', () => {
    expect(alert.getAttribute('role')).toBe('alert');
  });

  it('applies variant styles', () => {
    expect(alert.className).toContain('bg-card');
    const fixture = TestBed.createComponent(TestHost);
    fixture.componentInstance.variant = 'destructive';
    fixture.detectChanges();
    expect(alert.className).toContain('bg-card');
    const destructive = fixture.nativeElement.querySelector('ds-alert') as HTMLElement;
    expect(destructive.className).toContain('bg-red-50');
  });

  it('renders title and description', () => {
    expect(alert.textContent).toContain('Heads up!');
    expect(alert.textContent).toContain('You can add components to your app.');
  });
});
