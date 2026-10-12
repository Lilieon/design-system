import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  DsCardComponent,
  DsCardContentComponent,
  DsCardDescriptionComponent,
  DsCardFooterComponent,
  DsCardHeaderComponent,
  DsCardTitleComponent,
} from '@ds/ui/card/card';

@Component({
  imports: [
    DsCardComponent,
    DsCardHeaderComponent,
    DsCardTitleComponent,
    DsCardDescriptionComponent,
    DsCardContentComponent,
    DsCardFooterComponent,
  ],
  template: `
    <ds-card>
      <ds-card-header>
        <ds-card-title>Notifications</ds-card-title>
        <ds-card-description>You have 3 unread messages.</ds-card-description>
      </ds-card-header>
      <ds-card-content>Main content</ds-card-content>
      <ds-card-footer>Footer</ds-card-footer>
    </ds-card>
  `,
})
class TestHost {}

describe('DsCardComponent', () => {
  let card: HTMLElement;

  beforeEach(() => {
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    card = fixture.nativeElement.querySelector('ds-card') as HTMLElement;
  });

  it('applies token-based card surface classes', () => {
    expect(card.className).toContain('rounded-lg');
    expect(card.className).toContain('bg-card');
    expect(card.className).toContain('border-border');
    expect(card.className).toContain('shadow-sm');
  });

  it('renders all card parts', () => {
    const text = card.textContent ?? '';
    expect(text).toContain('Notifications');
    expect(text).toContain('You have 3 unread messages.');
    expect(text).toContain('Main content');
    expect(text).toContain('Footer');
  });

  it('styles title and description with hierarchy', () => {
    const title = card.querySelector('ds-card-title') as HTMLElement;
    const description = card.querySelector('ds-card-description') as HTMLElement;
    expect(title.className).toContain('font-semibold');
    expect(description.className).toContain('text-muted-fg');
  });
});
