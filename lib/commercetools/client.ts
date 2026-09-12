import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-auth';
import fetch from 'node-fetch';

const projectKey = process.env.NEXT_PUBLIC_CTP_PROJECT_KEY || '';
const clientId = process.env.NEXT_PUBLIC_CTP_CLIENT_ID || '';
const clientSecret = process.env.NEXT_PUBLIC_CTP_CLIENT_SECRET || '';
const region = process.env.NEXT_PUBLIC_CTP_REGION || 'us-central1';

const authUrl = `https://auth.${region}.gcp.commercetools.com`;
const apiUrl = `https://api.${region}.gcp.commercetools.com`;

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: authUrl,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes: [`manage_project:${projectKey}`],
  fetch: fetch as any,
});

export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withMiddleware(authMiddleware)
  .withFetch(fetch as any)
  .withApiUrl(apiUrl)
  .build();
