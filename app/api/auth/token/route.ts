// API route for commercetools authentication
import { NextRequest, NextResponse } from 'next/server';
import config from '@/lib/config';

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

export async function GET(request: NextRequest) {
  try {
    // Return cached token if still valid
    if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
      return NextResponse.json({ access_token: cachedToken });
    }

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
    });

    if (!response.ok) {
      console.error('Auth API error:', response.statusText);
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 401 }
      );
    }

    const data = await response.json();
    cachedToken = data.access_token;
    // Cache for 55 minutes (token expires in 60)
    tokenExpiry = Date.now() + data.expires_in * 1000 - 300000;

    return NextResponse.json({ access_token: cachedToken });
  } catch (error: any) {
    console.error('Token endpoint error:', error);
    return NextResponse.json(
      { error: 'Failed to get token' },
      { status: 500 }
    );
  }
}
