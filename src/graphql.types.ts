export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
  NaiveDateTime: any;
  UUID: any;
};

export type AcceptInviteInput = {
  invite: Scalars['UUID'];
};

export type AcceptInvitePayload = {
  __typename?: 'AcceptInvitePayload';
  invite: Invite;
};

export type AccessToken = {
  __typename?: 'AccessToken';
  accessToken: Scalars['String'];
  expiresAt: Scalars['NaiveDateTime'];
  tokenType: Scalars['String'];
};

export type Affiliation = Member | Owner;

export enum AssetType {
  Sol = 'SOL',
  SolTest = 'SOL_TEST'
}

export enum Blockchain {
  Polygon = 'POLYGON',
  Solana = 'SOLANA'
}

export type Collection = {
  __typename?: 'Collection';
  blockchain: Blockchain;
  creationStatus: CreationStatus;
  description: Scalars['String'];
  id: Scalars['UUID'];
  metadataUri: Scalars['String'];
  name: Scalars['String'];
  royaltyWallet: Scalars['String'];
  supply?: Maybe<Scalars['Int']>;
};

export type CollectionMint = {
  __typename?: 'CollectionMint';
  address: Scalars['String'];
  collectionId: Scalars['UUID'];
  createdAt: Scalars['NaiveDateTime'];
  createdBy: Scalars['UUID'];
  creationStatus: CreationStatus;
  id: Scalars['UUID'];
  owner: Scalars['String'];
};

export type CreateCredentialInput = {
  name: Scalars['String'];
  organization: Scalars['UUID'];
  projects: Array<Scalars['UUID']>;
  scopes: Array<Scalars['String']>;
};

export type CreateCredentialPayload = {
  __typename?: 'CreateCredentialPayload';
  accessToken: AccessToken;
  credential: Credential;
};

export type CreateCustomerInput = {
  project: Scalars['UUID'];
};

export type CreateCustomerPayload = {
  __typename?: 'CreateCustomerPayload';
  customer: Customer;
};

export type CreateDropInput = {
  blockchain: Blockchain;
  creators?: InputMaybe<Array<MetadataCreator>>;
  description: Scalars['String'];
  endTime: Scalars['DateTime'];
  isMutable: Scalars['Boolean'];
  name: Scalars['String'];
  ownerAddress: Scalars['String'];
  price: Scalars['Int'];
  projectId: Scalars['UUID'];
  royaltyAddress: Scalars['String'];
  sellerFeeBasisPoints: Scalars['Int'];
  startTime: Scalars['DateTime'];
  supply?: InputMaybe<Scalars['Int']>;
  symbol: Scalars['String'];
  updateAuthorityIsSigner: Scalars['Boolean'];
  uri: Scalars['String'];
};

export type CreateOrganizationInput = {
  name: Scalars['String'];
};

export type CreateOrganizationPayload = {
  __typename?: 'CreateOrganizationPayload';
  organization: Organization;
};

export type CreateProjectInput = {
  name: Scalars['String'];
  organization: Scalars['UUID'];
};

export type CreateProjectPayload = {
  __typename?: 'CreateProjectPayload';
  project: Project;
};

export type CreateTreasuryWalletInput = {
  assetType: AssetType;
  treasuryId: Scalars['UUID'];
};

export type CreateTreasuryWalletPayload = {
  __typename?: 'CreateTreasuryWalletPayload';
  wallet: Wallet;
};

export type CreateWebhookInput = {
  description: Scalars['String'];
  endpoint: Scalars['String'];
  filterTypes: Array<FilterType>;
  organization: Scalars['UUID'];
  projects: Array<Scalars['UUID']>;
};

export type CreateWebhookPayload = {
  __typename?: 'CreateWebhookPayload';
  secret: Scalars['String'];
  webhook: Webhook;
};

export enum CreationStatus {
  Created = 'CREATED',
  Pending = 'PENDING'
}

export type Credential = {
  __typename?: 'Credential';
  audiences: Array<Scalars['String']>;
  clientId: Scalars['String'];
  createdAt: Scalars['NaiveDateTime'];
  createdBy?: Maybe<User>;
  createdById: Scalars['UUID'];
  name: Scalars['String'];
  organizationId: Scalars['UUID'];
  projects: Array<Project>;
  scopes: Array<Scalars['String']>;
};

export type Customer = {
  __typename?: 'Customer';
  createdAt: Scalars['NaiveDateTime'];
  id: Scalars['UUID'];
  projectId: Scalars['UUID'];
  treasury?: Maybe<Treasury>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']>;
};

export type DeleteWebhookInput = {
  webhook: Scalars['UUID'];
};

export type DeleteWebhookPayload = {
  __typename?: 'DeleteWebhookPayload';
  webhook: Scalars['UUID'];
};

export type Drop = {
  __typename?: 'Drop';
  collection?: Maybe<Collection>;
  collectionId: Scalars['UUID'];
  createdAt: Scalars['NaiveDateTime'];
  createdBy: Scalars['UUID'];
  creationStatus: CreationStatus;
  endTime: Scalars['NaiveDateTime'];
  id: Scalars['UUID'];
  price: Scalars['Int'];
  projectId: Scalars['UUID'];
  startTime: Scalars['NaiveDateTime'];
};

export type EventType = {
  __typename?: 'EventType';
  archived?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['String'];
  description: Scalars['String'];
  name: Scalars['String'];
  schemas: Scalars['JSON'];
  updatedAt: Scalars['String'];
};

export enum FilterType {
  CustomerCreated = 'CUSTOMER_CREATED',
  CustomerTreasuryCreated = 'CUSTOMER_TREASURY_CREATED',
  CustomerWalletCreated = 'CUSTOMER_WALLET_CREATED',
  DropCreated = 'DROP_CREATED',
  DropMinted = 'DROP_MINTED',
  ProjectCreated = 'PROJECT_CREATED',
  ProjectWalletCreated = 'PROJECT_WALLET_CREATED'
}

export type Invite = {
  __typename?: 'Invite';
  createdAt: Scalars['NaiveDateTime'];
  createdBy: Scalars['UUID'];
  email: Scalars['String'];
  id: Scalars['UUID'];
  member?: Maybe<Member>;
  organization?: Maybe<Organization>;
  organizationId: Scalars['UUID'];
  status: InviteStatus;
  updatedAt?: Maybe<Scalars['NaiveDateTime']>;
};

export type InviteMemberInput = {
  email: Scalars['String'];
  organization: Scalars['UUID'];
};

export enum InviteStatus {
  Accepted = 'ACCEPTED',
  Revoked = 'REVOKED',
  Sent = 'SENT'
}

export type Member = {
  __typename?: 'Member';
  createdAt: Scalars['NaiveDateTime'];
  id: Scalars['UUID'];
  invite?: Maybe<Invite>;
  inviteId: Scalars['UUID'];
  organization?: Maybe<Organization>;
  organizationId: Scalars['UUID'];
  revokedAt?: Maybe<Scalars['NaiveDateTime']>;
  user?: Maybe<User>;
  userId: Scalars['UUID'];
};

export type MetadataCreator = {
  address: Scalars['String'];
  share: Scalars['Int'];
  verified: Scalars['Boolean'];
};

export type MintDropInput = {
  drop: Scalars['UUID'];
  edition: Scalars['Int'];
  ownerAddress: Scalars['String'];
  recipient: Scalars['String'];
};

export type MintEditionPayload = {
  __typename?: 'MintEditionPayload';
  collectionMint: CollectionMint;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Res
   *
   * # Errors
   * This function fails if ...
   */
  acceptInvite: AcceptInvitePayload;
  /**
   * Res
   *
   * # Errors
   * This function fails if ...
   */
  createCredential: CreateCredentialPayload;
  /**
   * Res
   *
   * # Errors
   * This function fails if ...
   */
  createCustomer: CreateCustomerPayload;
  /**
   * Res
   *
   * # Errors
   * This function fails if ...
   */
  createDrop: Drop;
  /**
   * Res
   *
   * # Errors
   * This function fails if ...
   */
  createOrganization: CreateOrganizationPayload;
  /**
   * Res
   *
   * # Errors
   * This function fails if ...
   */
  createProject: CreateProjectPayload;
  /**
   * Res
   *
   * # Errors
   * This function fails if ...
   */
  createTreasuryWallet: CreateTreasuryWalletPayload;
  /**
   * Res
   *
   * # Errors
   * This function fails if ...
   */
  createWebhook: CreateWebhookPayload;
  /**
   * Res
   *
   * # Errors
   * This function fails if ...
   */
  deleteWebhook: DeleteWebhookPayload;
  /**
   * Res
   *
   * # Errors
   * This function fails if ...
   */
  inviteMember: Invite;
  /**
   * Res
   *
   * # Errors
   * This function fails if ...
   */
  mintEdition: MintEditionPayload;
};


export type MutationAcceptInviteArgs = {
  input: AcceptInviteInput;
};


export type MutationCreateCredentialArgs = {
  input: CreateCredentialInput;
};


export type MutationCreateCustomerArgs = {
  input: CreateCustomerInput;
};


export type MutationCreateDropArgs = {
  input: CreateDropInput;
};


export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreateTreasuryWalletArgs = {
  input: CreateTreasuryWalletInput;
};


export type MutationCreateWebhookArgs = {
  input: CreateWebhookInput;
};


export type MutationDeleteWebhookArgs = {
  input: DeleteWebhookInput;
};


export type MutationInviteMemberArgs = {
  input: InviteMemberInput;
};


export type MutationMintEditionArgs = {
  input: MintDropInput;
};

export type Organization = {
  __typename?: 'Organization';
  createdAt: Scalars['NaiveDateTime'];
  credential: Credential;
  credentials: Array<Credential>;
  deactivatedAt?: Maybe<Scalars['NaiveDateTime']>;
  id: Scalars['UUID'];
  invites: Array<Invite>;
  members?: Maybe<Array<Member>>;
  name: Scalars['String'];
  owner?: Maybe<Owner>;
  projects: Array<Project>;
  webhook?: Maybe<Webhook>;
  webhooks?: Maybe<Array<Webhook>>;
};


export type OrganizationCredentialArgs = {
  clientId: Scalars['String'];
};


export type OrganizationCredentialsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type OrganizationInvitesArgs = {
  status?: InputMaybe<InviteStatus>;
};


export type OrganizationWebhookArgs = {
  id: Scalars['UUID'];
};

export type Owner = {
  __typename?: 'Owner';
  createdAt: Scalars['NaiveDateTime'];
  id: Scalars['UUID'];
  organization?: Maybe<Organization>;
  organizationId: Scalars['UUID'];
  user?: Maybe<User>;
  userId: Scalars['UUID'];
};

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['NaiveDateTime'];
  customer?: Maybe<Customer>;
  customers?: Maybe<Array<Customer>>;
  deactivatedAt?: Maybe<Scalars['NaiveDateTime']>;
  id: Scalars['UUID'];
  name: Scalars['String'];
  organization?: Maybe<Organization>;
  organizationId: Scalars['UUID'];
  treasury?: Maybe<Treasury>;
};


export type ProjectCustomerArgs = {
  id: Scalars['UUID'];
};

export type Query = {
  __typename?: 'Query';
  /**
   * Res
   *
   * # Errors
   * This function fails if ...
   */
  eventTypes: Array<EventType>;
  /**
   * Res
   *
   * # Errors
   * This function fails if ...
   */
  invite?: Maybe<Invite>;
  /**
   * Res
   *
   * # Errors
   * This function fails if ...
   */
  organization?: Maybe<Organization>;
  /**
   * Res
   *
   * # Errors
   * This function fails if ...
   */
  project?: Maybe<Project>;
  user?: Maybe<User>;
};


export type QueryInviteArgs = {
  id: Scalars['UUID'];
};


export type QueryOrganizationArgs = {
  id: Scalars['UUID'];
};


export type QueryProjectArgs = {
  id: Scalars['UUID'];
};


export type QueryUserArgs = {
  id: Scalars['UUID'];
};

export type Treasury = {
  __typename?: 'Treasury';
  createdAt: Scalars['NaiveDateTime'];
  id: Scalars['UUID'];
  vaultId: Scalars['String'];
  wallets?: Maybe<Array<Wallet>>;
};

export type User = {
  __typename?: 'User';
  affiliations: Array<Affiliation>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['UUID'];
  lastName: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Wallet = {
  __typename?: 'Wallet';
  address: Scalars['String'];
  assetId: AssetType;
  createdAt: Scalars['NaiveDateTime'];
  createdBy: Scalars['UUID'];
  legacyAddress: Scalars['String'];
  removedAt?: Maybe<Scalars['NaiveDateTime']>;
  tag: Scalars['String'];
  treasuryId: Scalars['UUID'];
};

export type Webhook = {
  __typename?: 'Webhook';
  channels: Array<Scalars['String']>;
  createdAt: Scalars['NaiveDateTime'];
  createdBy?: Maybe<User>;
  createdById: Scalars['UUID'];
  description: Scalars['String'];
  endpointId: Scalars['String'];
  events: Array<Scalars['String']>;
  id: Scalars['UUID'];
  organizationId: Scalars['UUID'];
  projects: Array<Project>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']>;
  url: Scalars['String'];
};
