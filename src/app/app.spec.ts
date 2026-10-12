import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('renders the gallery sections', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Design System Playground');
    expect(compiled.textContent).toContain('Buttons');
    expect(compiled.textContent).toContain('Alerts');
  });

  it('toggles the dark theme class on the document root', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const toggle = fixture.nativeElement.querySelector('header button') as HTMLButtonElement;
    toggle.click();
    await fixture.whenStable();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    toggle.click();
    await fixture.whenStable();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
