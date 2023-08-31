import Setup2fa from './Setup2fa';
import { cookies } from 'next/headers';
import { ory, serverConfig } from '../../../modules/ory';
import { AuthenticatorAssuranceLevel, Session } from '@ory/client';
import { redirect } from 'next/navigation';

const client = ory(serverConfig);

export default async function Profile2faPage() {
  const cookStore = cookies();
  let session: Session | undefined = undefined;

  try {
    const { data } = await client.toSession({
      cookie: `hub_session=${cookStore.get('hub_session')?.value}`,
    });

    session = data;
  } catch (e: any) {}

  if (session?.authenticator_assurance_level === AuthenticatorAssuranceLevel.Aal2) {
    return redirect('/profile/edit');
  }

  return <Setup2fa />;
}
