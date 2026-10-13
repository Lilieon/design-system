import { TestBed } from '@angular/core/testing';
import { Gallery } from './gallery';

describe('Gallery', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gallery],
    }).compileComponents();
  });

  it('renders the component sections', async () => {
    const fixture = TestBed.createComponent(Gallery);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Buttons');
    expect(compiled.textContent).toContain('Alerts');
    expect(compiled.querySelectorAll('button[dsbutton], button').length).toBeGreaterThan(0);
  });
});
