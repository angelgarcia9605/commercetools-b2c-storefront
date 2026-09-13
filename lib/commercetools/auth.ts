// commercetools authentication
import config from '@/lib/config';

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

export async function getAccessToken(): Promise<string> {
  // Return cached token if still valid
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  try {
    const credentials = Buffer.from(
      `${config.commercetools.clientId}:${config.commercetools.clientSecret}`
    ).toString('base64');

    const response = await fetch(`${config.commercetools.authUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials&scope=manage_project:test-estafeta',
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Auth failed: ${response.statusText}`);
    }

    const data = await response.json();
    cachedToken = data.access_token;
    // Cache for 55 minutes (token expires in 60)
    tokenExpiry = Date.now() + data.expires_in * 1000 - 300000;

    return cachedToken;
  } catch (error: any) {
    console.error('Failed to get access token:', error);
    throw new Error(`Authentication failed: ${error.message}`);
  }
}

export function clearTokenCache() {
  cachedToken = null;
  tokenExpiry = null;
}
