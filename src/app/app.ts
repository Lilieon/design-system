import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="mx-auto max-w-3xl px-6 py-12">
      <h1 class="text-3xl font-semibold tracking-tight">Design System Playground</h1>
      <p class="mt-2 text-sm text-muted-fg">Component gallery lands with the first components.</p>
    </main>
  `,
})
export class App {}
