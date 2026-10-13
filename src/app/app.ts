import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DsButtonComponent } from '@ds/ui';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive, DsButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
})
export class App {
  protected readonly dark = signal(false);

  protected toggleDark(): void {
    const next = !this.dark();
    this.dark.set(next);
    document.documentElement.classList.toggle('dark', next);
  }
}
