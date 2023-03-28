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

/** Fireblocks-defined blockchain identifiers. */
export enum AssetType {
  /** Ethereum Mainnet */
  Eth = 'ETH',
  /** Note: Holaplex uses `ETH_TEST` for provisioning wallets on its staging environment but still submits transactions to mainnet. */
  EthTest = 'ETH_TEST',
  /** Mainnet Polygon */
  Matic = 'MATIC',
  /**
   * Ploygon Mumbai Testnet
   * Note: Holaplex uses `MATIC_TEST` for provisioning wallets on its staging environment but still submits transactions to mainnet.
   */
  MaticTest = 'MATIC_TEST',
  /** Mainnet Solana */
  Sol = 'SOL',
  /**
   * Devnet Solana
   * Note: Holaplex uses `SOL_TEST` for provisioning wallets on its staging environment but still submits transactions to mainnet.
   */
  SolTest = 'SOL_TEST',
}

export enum Blockchain {
  Ethereum = 'ETHEREUM',
  Polygon = 'POLYGON',
  Solana = 'SOLANA',
}

/** An NFT collection that has either a fixed supply or unlimited mints. NFT collections are deployed to a desired blockchain. */
export type Collection = {
  __typename?: 'Collection';
  /** The blockchain address of the collection used to view it in blockchain explorers. */
  address?: Maybe<Scalars['String']>;
  /** The blockchain of the collection. */
  blockchain: Blockchain;
  /** The creation status of the collection. When the collection is in a `CREATED` status you can mint NFTs from the collection. */
  creationStatus: CreationStatus;
  /** The list of attributed creators for the collection. */
  creators?: Maybe<Array<CollectionCreator>>;
  /** The list of current holders of NFTs from the collection. */
  holders?: Maybe<Array<Holder>>;
  /** The unique identifier for the collection. */
  id: Scalars['UUID'];
  /**
   * The metadata json associated to the collection.
   * ## References
   * [Metaplex v1.1.0 Standard](https://docs.metaplex.com/programs/token-metadata/token-standard)
   */
  metadataJson?: Maybe<MetadataJson>;
  /** The list of minted NFTs from the collection including the NFTs address and current owner's wallet address. */
  mints?: Maybe<Array<CollectionMint>>;
  /** The total supply of the collection. Setting to `null` implies unlimited minting. */
  supply?: Maybe<Scalars['Int']>;
  /** The current number of NFTs minted from the collection. */
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

/** An attributed creator for a colleciton. */
export type CollectionCreatorInput = {
  /** The wallet address of the creator. */
  address: Scalars['String'];
  /** The share of royalties payout the creator should receive. */
  share: Scalars['Int'];
  /**
   * This field indicates whether the collection's creator has been verified. This feature is only supported on the Solana blockchain.
   * ## References
   * [Metaplex Token Metadata - Verify creator instruction](https://docs.metaplex.com/programs/token-metadata/instructions#verify-a-creator)
   */
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

/** Input for creating a customer wallet. */
export type CreateCustomerWalletInput = {
  /** Blockchain for wallet creation. */
  assetType: AssetType;
  /** The customer ID. */
  customer: Scalars['UUID'];
};

/** Response after wallet creation. */
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
  filterTypes: Array<FilterType>;
  organization: Scalars['UUID'];
  projects: Array<Scalars['UUID']>;
  url: Scalars['String'];
};

export type CreateWebhookPayload = {
  __typename?: 'CreateWebhookPayload';
  secret: Scalars['String'];
  webhook: Webhook;
};

export enum CreationStatus {
  Created = 'CREATED',
  Pending = 'PENDING',
}

export type Credential = {
  __typename?: 'Credential';
  clientId: Scalars['String'];
  createdAt: Scalars['NaiveDateTime'];
  createdBy?: Maybe<User>;
  createdById: Scalars['UUID'];
  name: Scalars['String'];
  organizationId: Scalars['UUID'];
};

export type Customer = {
  __typename?: 'Customer';
  createdAt: Scalars['NaiveDateTime'];
  id: Scalars['UUID'];
  projectId: Scalars['UUID'];
  /** The treasury assigned to the customer, which contains the customer's wallets. */
  treasury?: Maybe<Treasury>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']>;
};

export type DeleteCredentialInput = {
  credential: Scalars['String'];
};

export type DeleteCredentialPayload = {
  __typename?: 'DeleteCredentialPayload';
  credential: Scalars['String'];
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
  /** The collection for which the drop is managing mints. */
  collection: Collection;
  /** The date and time in UTC when the drop was created. */
  createdAt: Scalars['NaiveDateTime'];
  /** The user id of the person who created the drop. */
  createdById: Scalars['UUID'];
  /** The creation status of the drop. */
  creationStatus: CreationStatus;
  /** The end date and time in UTC for the drop. A value of `null` means the drop does not end until it is fully minted. */
  endTime?: Maybe<Scalars['NaiveDateTime']>;
  /** The unique identifier for the drop. */
  id: Scalars['UUID'];
  /** The cost to mint the drop in US dollars. When purchasing with crypto the user will be charged at the current conversion rate for the blockchain's native coin at the time of minting. */
  price: Scalars['Int'];
  /** The identifier of the project to which the drop is associated. */
  projectId: Scalars['UUID'];
  /** The date and time in UTC when the drop is eligible for minting. A value of `null` means the drop can be minted immediately. */
  startTime?: Maybe<Scalars['NaiveDateTime']>;
  /** The current status of the drop. */
  status: DropStatus;
};

/** The different phases of a drop. */
export enum DropStatus {
  /** The drop is still being created and is not ready to mint. */
  Creating = 'CREATING',
  /** The drop has expired and its end time has passed. */
  Expired = 'EXPIRED',
  /** The minting process for the collection is complete. */
  Minted = 'MINTED',
  /** Actively minting. */
  Minting = 'MINTING',
  /** The drop is scheduled for minting. */
  Scheduled = 'SCHEDULED',
}

export type EditCredentialInput = {
  clientId: Scalars['String'];
  name: Scalars['String'];
};

export type EditCredentialPayload = {
  __typename?: 'EditCredentialPayload';
  credential: Credential;
};

export type EditOrganizationInput = {
  id: Scalars['UUID'];
  name: Scalars['String'];
  profileImageUrl?: InputMaybe<Scalars['String']>;
};

export type EditOrganizationPayload = {
  __typename?: 'EditOrganizationPayload';
  organization: Organization;
};

export type EditProjectInput = {
  id: Scalars['UUID'];
  name: Scalars['String'];
  profileImageUrl?: InputMaybe<Scalars['String']>;
};

export type EditProjectPayload = {
  __typename?: 'EditProjectPayload';
  project: Project;
};

export type EditWebhookInput = {
  description: Scalars['String'];
  disabled?: InputMaybe<Scalars['Boolean']>;
  filterTypes: Array<FilterType>;
  projects: Array<Scalars['UUID']>;
  url: Scalars['String'];
  webhook: Scalars['UUID'];
};

export type EditWebhookPayload = {
  __typename?: 'EditWebhookPayload';
  webhook: Webhook;
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
  ProjectWalletCreated = 'PROJECT_WALLET_CREATED',
}

/** The holder of a collection. */
export type Holder = {
  __typename?: 'Holder';
  /** The wallet address of the holder. */
  address: Scalars['String'];
  /** The collection ID that the holder owns. */
  collectionId: Scalars['UUID'];
  /** The specific mints from the collection that the holder owns. */
  mints: Array<Scalars['String']>;
  /** The number of NFTs that the holder owns in the collection. */
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
  Sent = 'SENT',
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

/**
 * The collection's associated metadata JSON.
 * ## References
 * [Metaplex v1.1.0 Standard](https://docs.metaplex.com/programs/token-metadata/token-standard)
 */
export type MetadataJson = {
  __typename?: 'MetadataJson';
  /** An optional animated version of the NFT art. */
  animationUrl?: Maybe<Scalars['String']>;
  attributes?: Maybe<Array<MetadataJsonAttribute>>;
  collectionId: Scalars['UUID'];
  /** The description of the NFT. */
  description: Scalars['String'];
  /** An optional URL where viewers can find more information on the NFT, such as the collection's homepage or Twitter page. */
  externalUrl?: Maybe<Scalars['String']>;
  identifier: Scalars['String'];
  /** The image URI for the NFT. */
  image: Scalars['String'];
  /** The assigned name of the NFT. */
  name: Scalars['String'];
  /** The symbol of the NFT. */
  symbol: Scalars['String'];
  /** The URI for the complete metadata JSON. */
  uri: Scalars['String'];
};

/** An attribute of the NFT. */
export type MetadataJsonAttribute = {
  __typename?: 'MetadataJsonAttribute';
  collectionId: Scalars['UUID'];
  id: Scalars['UUID'];
  /** The name of the attribute. */
  traitType: Scalars['String'];
  /** The value of the attribute. */
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
   * Create a wallet for a customer and assign it to the customer's treasury account.
   *
   * # Errors
   * The mutation will result in an error if it is unable to interact with the database or communicate with Fireblocks.
   */
  createCustomerWallet: CreateCustomerWalletPayload;
  /**
   * This mutation creates a new NFT drop and its associated collection. The drop returns immediately with a creation status of CREATING. You can [set up a webhook](https://docs.holaplex.dev/hub/For%20Developers/webhooks-overview) to receive a notification when the drop is ready to be minted.
   * Error
   * If the drop cannot be saved to the database or fails to be emitted for submission to the desired blockchain, the mutation will result in an error.
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
  deleteCredential: DeleteCredentialPayload;
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
  editCredential: EditCredentialPayload;
  /**
   * Res
   *
   * # Errors
   * This function fails if unable to update organization to the database
   */
  editOrganization: EditOrganizationPayload;
  /**
   * Res
   *
   * # Errors
   * This function fails if ...
   */
  editProject: EditProjectPayload;
  /**
   * Res
   *
   * # Errors
   * This function fails if ...
   */
  editWebhook: EditWebhookPayload;
  /**
   * Res
   *
   * # Errors
   * This function fails if ...
   */
  inviteMember: Invite;
  /**
   * This mutation mints an NFT edition for a specific drop ID. The mint returns immediately with a creation status of CREATING. You can [set up a webhook](https://docs.holaplex.dev/hub/For%20Developers/webhooks-overview) to receive a notification when the mint is accepted by the blockchain.
   * # Errors
   * If the mint cannot be saved to the database or fails to be emitted for submission to the desired blockchain, the mutation will result in an error.
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

export type MutationDeleteCredentialArgs = {
  input: DeleteCredentialInput;
};

export type MutationDeleteWebhookArgs = {
  input: DeleteWebhookInput;
};

export type MutationEditCredentialArgs = {
  input: EditCredentialInput;
};

export type MutationEditOrganizationArgs = {
  input: EditOrganizationInput;
};

export type MutationEditProjectArgs = {
  input: EditProjectInput;
};

export type MutationEditWebhookArgs = {
  input: EditWebhookInput;
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
  /** Look up a drop associated with the project by its ID. */
  drop?: Maybe<Drop>;
  /** The drops associated with the project. */
  drops?: Maybe<Array<Drop>>;
  id: Scalars['UUID'];
  name: Scalars['String'];
  organization?: Maybe<Organization>;
  organizationId: Scalars['UUID'];
  profileImageUrl?: Maybe<Scalars['String']>;
  /** The treasury assigned to the project, which contains the project's wallets. */
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

/** A collection of wallets assigned to different entities in the Holaplex ecosystem. */
export type Treasury = {
  __typename?: 'Treasury';
  /** The creation datetime of the vault. */
  createdAt: Scalars['NaiveDateTime'];
  /** The unique identifier for the treasury. */
  id: Scalars['UUID'];
  /**
   * The associated Fireblocks vault ID.
   * ## Reference
   * [Vault Objects](https://docs.fireblocks.com/api/#vault-objects)
   */
  vaultId: Scalars['String'];
  /** Lookup a wallet based on its `asset_type`. */
  wallet?: Maybe<Wallet>;
  /** The treasury's associated wallets. */
  wallets?: Maybe<Array<Wallet>>;
};

/** A collection of wallets assigned to different entities in the Holaplex ecosystem. */
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

/** A blockchain wallet is a digital wallet that allows users to securely store, manage, and transfer their cryptocurrencies or other digital assets on a blockchain network. */
export type Wallet = {
  __typename?: 'Wallet';
  /** The wallet address. */
  address: Scalars['String'];
  /** The wallet's associated blockchain. */
  assetId: AssetType;
  createdAt: Scalars['NaiveDateTime'];
  createdBy: Scalars['UUID'];
  legacyAddress: Scalars['String'];
  /** The NFTs that were minted from Holaplex and are owned by the wallet's address. */
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
  events: Array<FilterType>;
  id: Scalars['UUID'];
  organizationId: Scalars['UUID'];
  projects: Array<Project>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']>;
  url: Scalars['String'];
};
