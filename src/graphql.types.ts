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
  /**
   * Implement the DateTime<Utc> scalar
   *
   * The input/output is a string in RFC3339 format.
   */
  DateTime: any;
  /** A scalar that can represent any JSON value. */
  JSON: any;
  /**
   * ISO 8601 combined date and time without timezone.
   *
   * # Examples
   *
   * * `2015-07-01T08:59:60.123`,
   */
  NaiveDateTime: any;
  /**
   * A UUID is a unique 128-bit number, stored as 16 octets. UUIDs are parsed as
   * Strings within GraphQL. UUIDs are used to assign unique identifiers to
   * entities without requiring a central allocating authority.
   *
   * # References
   *
   * * [Wikipedia: Universally Unique Identifier](http://en.wikipedia.org/wiki/Universally_unique_identifier)
   * * [RFC4122: A Universally Unique IDentifier (UUID) URN Namespace](http://tools.ietf.org/html/rfc4122)
   */
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
  Eth = 'ETH',
  EthTest = 'ETH_TEST',
  Matic = 'MATIC',
  MaticTest = 'MATIC_TEST',
  Sol = 'SOL',
  SolTest = 'SOL_TEST'
}

export enum Blockchain {
  Ethereum = 'ETHEREUM',
  Polygon = 'POLYGON',
  Solana = 'SOLANA'
}

export type Collection = {
  __typename?: 'Collection';
  address?: Maybe<Scalars['String']>;
  blockchain: Blockchain;
  creationStatus: CreationStatus;
  creators?: Maybe<Array<CollectionCreator>>;
  holders?: Maybe<Array<Holder>>;
  id: Scalars['UUID'];
  metadataJson?: Maybe<MetadataJson>;
  mints?: Maybe<Array<CollectionMint>>;
  supply?: Maybe<Scalars['Int']>;
  totalMints: Scalars['Int'];
};

export type CollectionCreator = {
  __typename?: 'CollectionCreator';
  address: Scalars['String'];
  collectionId: Scalars['UUID'];
  share: Scalars['Int'];
  shortAddress: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type CollectionCreatorInput = {
  address: Scalars['String'];
  share: Scalars['Int'];
  verified?: InputMaybe<Scalars['Boolean']>;
};

export type CollectionMint = {
  __typename?: 'CollectionMint';
  address: Scalars['String'];
  collection?: Maybe<Collection>;
  collectionId: Scalars['UUID'];
  createdAt: Scalars['NaiveDateTime'];
  createdBy: Scalars['UUID'];
  creationStatus: CreationStatus;
  id: Scalars['UUID'];
  owner: Scalars['String'];
  ownerShortAddress: Scalars['String'];
  shortAddress: Scalars['String'];
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

export type CreateCustomerWalletInput = {
  assetType: AssetType;
  customer: Scalars['UUID'];
};

export type CreateCustomerWalletPayload = {
  __typename?: 'CreateCustomerWalletPayload';
  wallet: Wallet;
};

export type CreateDropInput = {
  blockchain: Blockchain;
  creators: Array<CollectionCreatorInput>;
  endTime?: InputMaybe<Scalars['DateTime']>;
  metadataJson: MetadataJsonInput;
  price?: InputMaybe<Scalars['Int']>;
  project: Scalars['UUID'];
  sellerFeeBasisPoints?: InputMaybe<Scalars['Int']>;
  startTime?: InputMaybe<Scalars['DateTime']>;
  supply?: InputMaybe<Scalars['Int']>;
};

export type CreateDropPayload = {
  __typename?: 'CreateDropPayload';
  drop: Drop;
};

export type CreateOrganizationInput = {
  name: Scalars['String'];
  profileImageUrl?: InputMaybe<Scalars['String']>;
};

export type CreateOrganizationPayload = {
  __typename?: 'CreateOrganizationPayload';
  organization: Organization;
};

export type CreateProjectInput = {
  name: Scalars['String'];
  organization: Scalars['UUID'];
  profileImageUrl?: InputMaybe<Scalars['String']>;
};

export type CreateProjectPayload = {
  __typename?: 'CreateProjectPayload';
  project: Project;
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
  collection: Collection;
  createdAt: Scalars['NaiveDateTime'];
  createdById: Scalars['UUID'];
  creationStatus: CreationStatus;
  endTime?: Maybe<Scalars['NaiveDateTime']>;
  id: Scalars['UUID'];
  price: Scalars['Int'];
  projectId: Scalars['UUID'];
  startTime?: Maybe<Scalars['NaiveDateTime']>;
  status: DropStatus;
};

export enum DropStatus {
  Creating = 'CREATING',
  Expired = 'EXPIRED',
  Minted = 'MINTED',
  Minting = 'MINTING',
  Scheduled = 'SCHEDULED'
}

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

export type Holder = {
  __typename?: 'Holder';
  address: Scalars['String'];
  collectionId: Scalars['UUID'];
  mints: Array<Scalars['String']>;
  owns: Scalars['Int'];
  shortAddress: Scalars['String'];
};

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

export type MetadataJson = {
  __typename?: 'MetadataJson';
  animationUrl?: Maybe<Scalars['String']>;
  attributes?: Maybe<Array<MetadataJsonAttribute>>;
  collectionId: Scalars['UUID'];
  description: Scalars['String'];
  externalUrl?: Maybe<Scalars['String']>;
  identifier: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  uri: Scalars['String'];
};

export type MetadataJsonAttribute = {
  __typename?: 'MetadataJsonAttribute';
  collectionId: Scalars['UUID'];
  id: Scalars['UUID'];
  traitType: Scalars['String'];
  value: Scalars['String'];
};

export type MetadataJsonAttributeInput = {
  traitType: Scalars['String'];
  value: Scalars['String'];
};

export type MetadataJsonCollectionInput = {
  family?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type MetadataJsonFileInput = {
  fileType?: InputMaybe<Scalars['String']>;
  uri?: InputMaybe<Scalars['String']>;
};

export type MetadataJsonInput = {
  animationUrl?: InputMaybe<Scalars['String']>;
  attributes: Array<MetadataJsonAttributeInput>;
  collection?: InputMaybe<MetadataJsonCollectionInput>;
  description: Scalars['String'];
  externalUrl?: InputMaybe<Scalars['String']>;
  image: Scalars['String'];
  name: Scalars['String'];
  properties?: InputMaybe<MetadataJsonPropertyInput>;
  symbol: Scalars['String'];
};

export type MetadataJsonPropertyInput = {
  category?: InputMaybe<Scalars['String']>;
  files?: InputMaybe<Array<MetadataJsonFileInput>>;
};

export type MintDropInput = {
  drop: Scalars['UUID'];
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
  createCustomerWallet: CreateCustomerWalletPayload;
  /**
   * Res
   *
   * # Errors
   * This function fails if ...
   */
  createDrop: CreateDropPayload;
  /**
   * Res
   *
   * # Errors
   * This function fails if unable to save organization to the database
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


export type MutationCreateCustomerWalletArgs = {
  input: CreateCustomerWalletInput;
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
  profileImageUrl?: Maybe<Scalars['String']>;
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
  drop?: Maybe<Drop>;
  drops?: Maybe<Array<Drop>>;
  id: Scalars['UUID'];
  name: Scalars['String'];
  organization?: Maybe<Organization>;
  organizationId: Scalars['UUID'];
  profileImageUrl?: Maybe<Scalars['String']>;
  treasury?: Maybe<Treasury>;
};


export type ProjectCustomerArgs = {
  id: Scalars['UUID'];
};


export type ProjectDropArgs = {
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
  wallet?: Maybe<Wallet>;
  wallets?: Maybe<Array<Wallet>>;
};


export type TreasuryWalletArgs = {
  assetType: AssetType;
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
  mints?: Maybe<Array<CollectionMint>>;
  removedAt?: Maybe<Scalars['NaiveDateTime']>;
  shortAddress: Scalars['String'];
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
