import MintQueuedSupply from './MintQueuedSupply';

interface MintQueuedSupplyPageProps {
  params: {
    drop: string;
    mint: string;
    project: string;
  };
}
export default function MintQueuedSupplyPage({
  params: { project, drop, mint },
}: MintQueuedSupplyPageProps) {
  return <MintQueuedSupply drop={drop} mint={mint} project={project} />;
}
