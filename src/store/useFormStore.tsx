import { FileWithPath } from 'react-dropzone';
import create from 'zustand';

export type FileWithPreview = FileWithPath & { preview: string };

export type StepOneData = {
  name: string;
  symbol: string;
  blockchain: string;
  description: string;
  artwork?: FileWithPreview[];
};

export type StepTwoData = {
  maxSupply: number;
  solPrice: number;
  treasuryWallet: string;
  royaltyInTreasuryWallet: boolean;
  royaltyWallets?: { wallet: string; royaltyPercent: number };
  secondarySaleSellerFeePercent: number;
};

export type StepThreeData = {
  startDate?: Date;
  startTime?: Date;
  endDate?: Date;
  endTime?: Date;
  mintImmediately?: boolean;
  noEndOfSales?: boolean;
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

const useFormStore = create<{
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

export default useFormStore;
