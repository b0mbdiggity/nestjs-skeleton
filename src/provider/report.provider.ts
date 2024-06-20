// import * as Sentry from '@sentry/node';
// import { Severity } from '@sentry/node';

import { LogProvider } from './log.provider';

export class ReportProvider {
  static report(
    error: Error,
    extra: Record<string, unknown>,
    // severity: Severity = Severity.Error,
  ): void {
    // Sentry.withScope((scope) => {
    //   Object.entries(extra).forEach(([key, value]) =>
    //     scope.setExtra(key, value),
    //   );
    //   scope.setLevel(severity);
    //   Sentry.captureException(error);
    // });
  }
}
