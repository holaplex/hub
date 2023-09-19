import EditProfile from './EditProfile';
import { ory, serverConfig } from '../../../modules/ory';
import { Session } from '@ory/client';
import { redirect } from 'next/navigation';
import { isSessionExpired } from '../../../modules/session';

import { cookies } from 'next/headers';

const client = ory(serverConfig);

export default async function EditProfilePage(): Promise<JSX.Element> {
  const cookStore = cookies();
  let session: Session | undefined = undefined;

  try {
    const { data } = await client.toSession({
      cookie: `hub_session=${cookStore.get('hub_session')?.value}`,
    });

    session = data;
  } catch (e: any) {}

  if (isSessionExpired(session?.expires_at as string)) {
    return redirect('/login?return_to=/profile/edit');
  }

  return <EditProfile />;
}
