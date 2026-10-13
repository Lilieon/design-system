import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the shell with navigation to the Brand Lab', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Design System');
    expect(compiled.querySelector('a[href="/brand-lab"]')).toBeTruthy();
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
