export enum PurchaseStatus {
  PENDING = 'Pending',
  SUCCESS = 'Success',
  FAILED = 'Failed',
}

export enum DropStatus {
  SCHEDULED,
  MINTING,
  MINTED,
}

export enum WebhookStatus {
  ACTIVE = 'Active',
  DISABLED = 'Disabled',
}

export enum TransactionStatus {
  IN_PROCESS = 'In process',
  SUCCESS = 'Success',
  FAILED = 'Failed',
}

export enum TransactionType {
  RECEIVED = 'Received',
  SENT = 'Sent',
}
