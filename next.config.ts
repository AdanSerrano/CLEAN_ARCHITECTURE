import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withSentryConfig(nextConfig, {
    // Configuración de Sentry
    org: "adanserrano-kz",
    project: "javascript-nextjs",

    // Auth token desde variables de entorno
    authToken: process.env.SENTRY_AUTH_TOKEN,

    // Configuración de source maps
    sourcemaps: {
        deleteSourcemapsAfterUpload: true
    },

    // Solo mostrar logs de source maps en CI
    silent: !process.env.CI,

    // Configuraciones adicionales
    widenClientFileUpload: true,

    reactComponentAnnotation: {
        enabled: true,
    },

    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true
});