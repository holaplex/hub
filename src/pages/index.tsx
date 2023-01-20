import Head from 'next/head';
import { Inter } from '@next/font/google';
import { Identity } from '@ory/client';
import { useSession } from '../hooks/useSession';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

// Returns either the email or the username depending on the user's Identity Schema
const getUserName = (identity: Identity) => identity.traits.email || identity.traits.username;

export default function Home() {
  const { session, logout } = useSession();

  return (
    <>
      <Head>
        <title>Hub</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        {session ? (
          <>Welcome {getUserName(session?.identity)}!</>
        ) : (
          <Link href="/login" passHref>
            <span className="font-bold">Login</span>
          </Link>
        )}
        <div className="">
          <div className="">
            <div className="text-2xl">HUB</div>
          </div>
        </div>
        <p className="">
          {session && (
            <>
              <button onClick={logout}>Log out</button>
            </>
          )}
        </p>
      </main>
    </>
  );
}