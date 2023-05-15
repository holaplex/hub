import { create } from 'zustand';
import { CollectionCreatorInput, Blockchain } from '../graphql.types';

interface Attribute {
  traitType: string;
  value: string;
}

export type StepOneData = {
  name: string;
  symbol: string;
  blockchain: { label: string; id: Blockchain };
  description: string;
  image: File | string;
  attributes: Attribute[];
  externalUrl: string;
};

export type StepTwoData = {
  supply: string;
  treasuryAllRoyalties: boolean;
  creators: CollectionCreatorInput[];
  royalties?: string;
};

export type StepThreeData = {
  startDate?: Date;
  startTime?: string;
  endDate?: Date;
  endTime?: string;
  startNow?: boolean;
  noEndTime?: boolean;
};

export type FormData = StepOneData & StepTwoData & StepThreeData;
const stepVariant = {
  1: 'stepOne',
  2: 'stepTwo',
  3: 'stepThree',
};

type setDataType =
  | { step: 1; data: StepOneData }
  | { step: 2; data: StepTwoData }
  | { step: 3; data: StepThreeData };

const useCreateDropStore = create<{
  stepOne: StepOneData | null;
  stepTwo: StepTwoData | null;
  stepThree: StepThreeData | null;
  setData: ({ step, data }: setDataType) => void;
}>((set) => ({
  stepOne: null,
  stepTwo: null,
  stepThree: null,
  setData: ({ step, data }) =>
    set((state) => ({
      ...state,
      [stepVariant[step]]: data,
    })),
}));

export default useCreateDropStore;
