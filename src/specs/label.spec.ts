import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DsLabelComponent } from '@ds/ui/label/label';

@Component({
  imports: [DsLabelComponent],
  template: `
    <ds-label for="email">Email</ds-label>
    <input id="email" />
  `,
})
class TestHost {}

describe('DsLabelComponent', () => {
  it('renders label text and binds to the input through for', () => {
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('ds-label') as HTMLElement;
    expect(label.textContent).toContain('Email');
    expect(label.className).toContain('text-sm');
    expect(label.className).toContain('font-medium');
    expect(label.getAttribute('for')).toBe('email');
  });
});
