import { cookies } from 'next/headers';
import { apollo } from '../../../../../../../client';
import { GetProject } from './../../../../../../../queries/project.graphql';
import TreasuryWallet, { Wallet } from '../../../../../../../layouts/TreasuryWallet';

export const revalidate = 0;

interface WalletLayoutProps {
  children: React.ReactNode;
  params: { wallet: string };
}
interface GetWalletData {
  wallet: Wallet;
}

interface GetWalletVars {
  wallet: string;
}

export default async function WalletLayout({
  children,
  params: { wallet },
}: WalletLayoutProps): Promise<React.ReactNode> {
  const cookieStore = cookies();
  const client = apollo(
    process.env.GRAPHQL_ENDPOINT as string,
    cookieStore.get('hub_session')?.value as string
  );

  const walletQuery = await client.query<GetWalletData, GetWalletVars>({
    fetchPolicy: 'network-only',
    query: GetProject,
    variables: { wallet },
  });

  return <TreasuryWallet wallet={walletQuery.data.wallet}>{children}</TreasuryWallet>;
}
