import type { BrowserOptions } from '@sentry/browser';
import {
  WINDOW,
  addEventProcessor,
  getDefaultIntegrations,
  initWithDefaultIntegrations as browserInitWithDefaultIntegrations,
} from '@sentry/browser';
import type { Client, EventProcessor, Integration } from '@sentry/core';
import { applySdkMetadata } from '@sentry/core';

/**
 * Inits the Svelte SDK
 */
export function init(options: BrowserOptions): Client | undefined {
  return initWithDefaultIntegrations(options, getDefaultIntegrations);
}

/**
 * Inits the Svelte SDK with the given default integrations getter function.
 */
export function initWithDefaultIntegrations(
  options: BrowserOptions,
  getDefaultIntegrations: (options: BrowserOptions) => Integration[],
): Client | undefined {
  const opts = {
    ...options,
  };

  applySdkMetadata(opts, 'svelte');

  const client = browserInitWithDefaultIntegrations(opts, getDefaultIntegrations);

  detectAndReportSvelteKit();

  return client;
}
