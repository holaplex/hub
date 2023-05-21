export enum PurchaseStatus {
  PENDING = 'Pending',
  SUCCESS = 'Success',
  FAILED = 'Failed',
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

export enum MemberStatus {
  Accepted = 'ACCEPTED',
  Revoked = 'REVOKED',
  Sent = 'SENT',
  Owner = 'OWNER',
  Inactive = 'INACTIVE',
}

export enum WebhookEvent {
  PROJECT_CREATED = 'Project created',
  PROJECT_DEACTIVATED = 'Project deactivated',
  INVITATION_SENT = 'Invitation sent',
  INVITATION_ACCEPTED = 'Invitation accepted',
  INVITATION_REVOKED = 'Invitation revoked',
  CREDENTIAL_CREATED = 'Credential created',
}

export enum CredentialStatus {
  ACTIVE = 'Active',
  DISABLED = 'Disabled',
}

export enum ErrorCode {
  Unauthorized = 'UNAUTHORIZED',
}
