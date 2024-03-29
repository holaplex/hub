import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

import App from './App';
import { cookies } from 'next/headers';
import { ory, serverConfig } from '../modules/ory';
import { Session } from '@ory/client';
import Script from 'next/script';

export const metadata = {
  title: 'Holaplex HUB',
};

const client = ory(serverConfig);

const showCookieConsentBanner = process.env.NEXT_PUBLIC_COOKIE_CONSENT_BANNER === 'true';
const termlyId = process.env.NEXT_PUBLIC_TERMLY_ID;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookStore = cookies();
  let session: Session | undefined = undefined;

  try {
    const { data } = await client.toSession({
      cookie: `hub_session=${cookStore.get('hub_session')?.value}`,
    });

    session = data;
  } catch (e: any) {}

  return (
    <html lang="en">
      <body>
        <App session={session}>{children}</App>
        {showCookieConsentBanner && (
          <Script
            src="https://app.termly.io/embed.min.js"
            type="text/javascript"
            data-auto-block="on"
            data-website-uuid={termlyId}
          />
        )}
      </body>
    </html>
  );
}
