import { apollo } from '../../../../../../../client';
import { config } from '../../../../../../../app.config';
import { GetProject } from './../../../../../../../queries/project.graphql';
import TreasuryWallet, { Wallet } from '../../../../../../../layouts/TreasuryWallet';

const client = apollo(config.server('graphql'));

interface WalletLayoutProps {
  children: JSX.Element;
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
}: WalletLayoutProps): Promise<JSX.Element> {
  const walletQuery = await client.query<GetWalletData, GetWalletVars>({
    query: GetProject,
    variables: { wallet },
  });

  return <TreasuryWallet wallet={walletQuery.data.wallet}>{children}</TreasuryWallet>;
}
