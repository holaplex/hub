import { createStore, StoreApi } from 'zustand';
import { CollectionCreatorInput, Blockchain } from '../graphql.types';
import { createContext } from 'react';

interface Attribute {
  traitType: string;
  value: string;
}

export type DetailSettings = {
  name: string;
  symbol: string;
  blockchain: Blockchain;
  description: string;
  image: File | string;
  attributes: Attribute[];
  externalUrl: string;
};

export type PaymentSettings = {
  supply: string;
  royaltyDestination: string;
  creators: CollectionCreatorInput[];
  royaltyPercentage: string;
  customRoyalty?: string;
};

export type TimingSettings = {
  startDate?: Date;
  startTime?: string;
  endDate?: Date;
  endTime?: string;
  selectStartDate: string;
  selectEndDate: string;
};

export interface DropFormProps {
  detail?: DetailSettings;
  payment?: PaymentSettings;
  timing?: TimingSettings;
}

export interface DropFormState extends DropFormProps {
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
