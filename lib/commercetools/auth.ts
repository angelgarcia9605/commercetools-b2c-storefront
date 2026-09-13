// commercetools authentication - client side
let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

export async function getAccessToken(): Promise<string> {
  // Return cached token if still valid
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  try {
    const response = await fetch('/api/auth/token');
    
    if (!response.ok) {
      throw new Error(`Token request failed: ${response.statusText}`);
    }

    const data = await response.json();
    cachedToken = data.access_token;
    // Cache for 55 minutes
    tokenExpiry = Date.now() + 55 * 60 * 1000;

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
