import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHighlightOptions } from 'ngx-highlightjs';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHighlightOptions({
    fullLibraryLoader: () => import('highlight.js'),
    lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
  }),]
};
