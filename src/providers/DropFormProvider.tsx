import { createStore, StoreApi } from 'zustand';
import { Blockchain, CollectionCreator, CreatorInput } from '../graphql.types';
import { createContext } from 'react';

export interface Attribute {
  traitType: string;
  value: string;
}

export type DetailSettings = {
  name: string;
  symbol: string;
  description: string;
  image: File | string;
  animationUrl?: string;
  includeAnimationUrl?: boolean;
  attributes: Attribute[];
  externalUrl: string;
};

export const blockchainOptions = [
  {
    id: Blockchain.Solana,
    name: 'Solana',
  },
  {
    id: Blockchain.Polygon,
    name: 'Polygon',
  },
];

export enum RoyaltiesShortcut {
  Zero = '0%',
  TwoPointFive = '2.5%',
  Five = '5%',
  Ten = '10%',
  Custom = 'custom',
}

export enum DropType {
  Open = 'OPEN',
  Edition = 'EDITION',
}

export enum RoyaltiesDestination {
  ProjectTreasury = 'projectTreasury',
  Creators = 'creators',
}

export type PaymentSettings = {
  royaltiesDestination: RoyaltiesDestination;
  creators: CreatorInput[];
  royaltiesShortcut: RoyaltiesShortcut;
  royalties?: string;
};

export type TimingSettings = {
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  selectStartDate: string;
  selectEndDate: string;
};

export type TypeSettings = {
  supply: string;
  type: DropType;
  blockchain: {
    id: Blockchain;
    name: string;
  };
};

export interface DropFormProps {
  detail?: DetailSettings;
  payment?: PaymentSettings;
  timing?: TimingSettings;
  type?: TypeSettings;
}

export interface DropFormState extends DropFormProps {
  setType: (type: TypeSettings) => void;
  setPayment: (payment: PaymentSettings) => void;
  setTiming: (timing: TimingSettings) => void;
  setDetail: (detail: DetailSettings) => void;
}

type DropFormStore = ReturnType<typeof createDropFormState>;

export const createDropFormState = (initProps: Partial<DropFormProps>) => {
  return createStore<DropFormState>()((set) => ({
    ...initProps,
    setPayment: (payment) => set((state) => ({ ...state, payment })),
    setTiming: (timing) => set((state) => ({ ...state, timing })),
    setDetail: (detail) => set((state) => ({ ...state, detail })),
    setType: (type) => set((state) => ({ ...state, type })),
  }));
};

export const DropFormContext = createContext<DropFormStore | null>(null);

export function DropFormProvider({
  children,
  store,
}: {
  children: React.ReactNode;
  store: StoreApi<DropFormState>;
}) {
  return (
    <DropFormContext.Provider value={store}>
      <>{children}</>
    </DropFormContext.Provider>
  );
}
