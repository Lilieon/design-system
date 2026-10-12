import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  it('renders the playground title', async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Design System Playground');
  });
});
