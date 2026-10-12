import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DsInputComponent } from '@ds/ui/input/input';

@Component({
  imports: [DsInputComponent],
  template: `<input dsInput placeholder="Email" />`,
})
class TestHost {}

describe('DsInputComponent', () => {
  it('applies base input classes and keeps placeholder', () => {
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.className).toContain('border-input');
    expect(input.className).toContain('focus-visible:ring-[3px]');
    expect(input.className).toContain('aria-invalid:border-destructive');
    expect(input.placeholder).toBe('Email');
  });
});
