import 'react-toastify/dist/ReactToastify.css';
import '@holaplex/ui-library-react/dist/index.css';
import './globals.css';

import App from './App'
import { cookies } from 'next/headers';
import { ory, serverConfig } from '../modules/ory';
import { Session } from '@ory/client';

const client = ory(serverConfig);

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookStore = cookies();
  let session: Session | undefined = undefined;

  try {
    const { data } = await client.toSession({
      cookie: `hub_session=${cookStore.get('hub_session')?.value}`,
    });

    session = data;
  } catch (e: any) {
  }

  return (
    <html lang="en">
      <body>
        <App session={session}>{children}</App>
      </body>
    </html>
  );
}
