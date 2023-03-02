import { cookies } from 'next/headers';
import { apollo } from '../../../../../../../client';
import { appConfig } from '../../../../../../../app.config';
import { GetProject } from './../../../../../../../queries/project.graphql';
import TreasuryWallet, { Wallet } from '../../../../../../../layouts/TreasuryWallet';
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
    appConfig.server('graphql'),
    cookieStore.get('hub_session')?.value as string
  );

  const walletQuery = await client.query<GetWalletData, GetWalletVars>({
    query: GetProject,
    variables: { wallet },
  });

  return <TreasuryWallet wallet={walletQuery.data.wallet}>{children}</TreasuryWallet>;
}
