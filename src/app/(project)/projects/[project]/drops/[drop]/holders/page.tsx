import Holders from "./Holders";

type Holder = {
  customerId: string;
  wallet: string;
  spent: number;
  ownedEditions: number;
};

interface HoldersPageProps {
  params: { project: string; drop: string };
}

export default function HoldersPage({ params: { project, drop } }: HoldersPageProps) {
  return <Holders project={project} drop={drop} />
}
