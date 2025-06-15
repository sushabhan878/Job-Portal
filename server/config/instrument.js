import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://77459273eb2294b835de84a592449171@o4509501040951296.ingest.us.sentry.io/4509501046521856",
  integrations: [Sentry.mongooseIntegration()],

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});
