import Purchases from "./Purchases";

interface PurchasesPageProps {
  params: { project: string; drop: string };
}

export default function PurchasePage({ params: { project, drop } }: PurchasesPageProps) {
  return <Purchases project={project} drop={drop} />
}
