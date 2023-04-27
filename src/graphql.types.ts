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

/** Input required for accepting an invitation to the organization. */
export type AcceptInviteInput = {
  /** The ID of the invitation. */
  invite: Scalars['UUID'];
};

/** The response returned after accepting an invitation to the organization. */
export type AcceptInvitePayload = {
  __typename?: 'AcceptInvitePayload';
  /** The invitation to the organization that has been accepted. */
  invite: Invite;
};

/** An access token used to authenticate and authorize access to the Hub API. */
export type AccessToken = {
  __typename?: 'AccessToken';
  /** A string representing the access token used to authenticate requests. */
  accessToken: Scalars['String'];
  /** A timestamp indicating when the access token will expire. */
  expiresAt: Scalars['NaiveDateTime'];
  /** A string indicating the type of access token, such as "Bearer". */
  tokenType: Scalars['String'];
};

/** An enum type named Affiliation that defines a user's association to an organization. The enum is derived using a Union attribute. It has two variants, each containing an associated data type: */
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
  /** A list of all NFT purchases from the collection, including both primary and secondary sales. */
  purchases?: Maybe<Array<Purchase>>;
  royalties: Scalars['String'];
  /** The royalties assigned to mints belonging to the collection expressed in basis points. */
  sellerFeeBasisPoints: Scalars['Int'];
  /** The transaction signature of the collection. */
  signature?: Maybe<Scalars['String']>;
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

/** Represents a single NFT minted from a collection. */
export type CollectionMint = {
  __typename?: 'CollectionMint';
  /** The wallet address of the NFT. */
  address: Scalars['String'];
  /** The collection the NFT was minted from. */
  collection?: Maybe<Collection>;
  /** The ID of the collection the NFT was minted from. */
  collectionId: Scalars['UUID'];
  /** The date and time when the NFT was created. */
  createdAt: Scalars['NaiveDateTime'];
  /** The unique ID of the creator of the NFT. */
  createdBy: Scalars['UUID'];
  /** The status of the NFT creation. */
  creationStatus: CreationStatus;
  /** The unique ID of the minted NFT. */
  id: Scalars['UUID'];
  /**
   * The metadata json associated to the collection.
   * [Metaplex v1.1.0 Standard](https://docs.metaplex.com/programs/token-metadata/token-standard)
   */
  metadataJson?: Maybe<MetadataJson>;
  /** The wallet address of the owner of the NFT. */
  owner: Scalars['String'];
  ownerShortAddress: Scalars['String'];
  /** The seller fee basis points (ie royalties) for the NFT. */
  sellerFeeBasisPoints: Scalars['Int'];
  shortAddress: Scalars['String'];
  /** The transaction signature associated with the NFT. */
  signature?: Maybe<Scalars['String']>;
};

/** This struct represents the input for creating a new API credential, including the ID of the organization that the credential will be associated with and the friendly name assigned to the credential. */
export type CreateCredentialInput = {
  /** The friendly name assigned to the new API credential. */
  name: Scalars['String'];
  /** The ID of the organization that the new API credential will be associated with. */
  organization: Scalars['UUID'];
};

/** The response payload returned after successfully creating an API credential. It includes the newly created Credential object, which represents the API credential, as well as an `AccessToken` object that can be used to authenticate requests to the Hub API. */
export type CreateCredentialPayload = {
  __typename?: 'CreateCredentialPayload';
  /** An `AccessToken` object that can be used to authenticate requests to the Hub API. */
  accessToken: AccessToken;
  /** A `Credential` object representing the newly created API credential. */
  credential: Credential;
};

/** This input object is used for creating a customer and associated treasury for holding custodial wallets on behalf of the user. */
export type CreateCustomerInput = {
  /** The unique identifier of the project to which the customer is associated. */
  project: Scalars['UUID'];
};

/** This response represents the payload returned after successfully creating a new `customer` record. It contains a single field customer which is a `Customer` object representing the newly created customer record. */
export type CreateCustomerPayload = {
  __typename?: 'CreateCustomerPayload';
  /** The customer record created by the create customer mutation. */
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

/** The input used for creating a project. */
export type CreateProjectInput = {
  /** The friendly name to denote the project from others belonging to the organization. */
  name: Scalars['String'];
  /** The ID of the organization the project belongs to. */
  organization: Scalars['UUID'];
  /** The URL of the project's profile image. */
  profileImageUrl?: InputMaybe<Scalars['String']>;
};

/** * The payload returned by the `createProject` mutation. */
export type CreateProjectPayload = {
  __typename?: 'CreateProjectPayload';
  /** * The project that was created. */
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
  Blocked = 'BLOCKED',
  Canceled = 'CANCELED',
  Created = 'CREATED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
}

/** An `OAuth2` client application used for authentication with the Hub API. */
export type Credential = {
  __typename?: 'Credential';
  /** A unique identifier for the credential. */
  clientId: Scalars['String'];
  /** The datetime in UTC when the credential was created. */
  createdAt: Scalars['NaiveDateTime'];
  /** This field represents the user who created the credential. */
  createdBy?: Maybe<User>;
  /** The ID of the user who created the credential. */
  createdById: Scalars['UUID'];
  /** A user-friendly name assigned to the credential. */
  name: Scalars['String'];
  /** The ID of the organization the credential belongs to. */
  organizationId: Scalars['UUID'];
};

/** A customer record represents a user in your service and is used to group custodial wallets within a specific project. This allows for easy management of wallets and associated assets for a particular customer within your service. */
export type Customer = {
  __typename?: 'Customer';
  /**
   * Returns all the wallet addresses associated with the customer. The blockchain of the address is not included and they are in no particular order. In the future, the blockchain may be indicated with a pattern of {blockchain}:{address}.
   * This field returns null when there is no treasury assigned to the customer yet.
   */
  addresses?: Maybe<Array<Scalars['String']>>;
  /** The datetime when the customer record was created. */
  createdAt: Scalars['NaiveDateTime'];
  /** The unique identifier for the customer record. */
  id: Scalars['UUID'];
  /** The NFTs owned by any of the customers' wallets. */
  mints?: Maybe<Array<CollectionMint>>;
  /** The ID of the project to which the customer record belongs. */
  projectId: Scalars['UUID'];
  /** The treasury assigned to the customer, which contains the customer's wallets. */
  treasury?: Maybe<Treasury>;
  /** An optional datetime indicating the last time the customer record was updated. If the customer record has not been updated, this field will be `null`. */
  updatedAt?: Maybe<Scalars['NaiveDateTime']>;
  wallet?: Maybe<Array<Wallet>>;
};

/** A customer record represents a user in your service and is used to group custodial wallets within a specific project. This allows for easy management of wallets and associated assets for a particular customer within your service. */
export type CustomerWalletArgs = {
  assetId?: InputMaybe<AssetType>;
};

export type DeactivateMemberInput = {
  id: Scalars['UUID'];
};

/** The input for deleting a credential. */
export type DeleteCredentialInput = {
  /** The unique identifier assigned to the credential to be deleted. */
  credential: Scalars['String'];
};

/** The response for deleting a credential. */
export type DeleteCredentialPayload = {
  __typename?: 'DeleteCredentialPayload';
  /** The unique identifier assigned to the deleted credential. */
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
  pausedAt?: Maybe<Scalars['NaiveDateTime']>;
  /** The cost to mint the drop in US dollars. When purchasing with crypto the user will be charged at the current conversion rate for the blockchain's native coin at the time of minting. */
  price: Scalars['Int'];
  /** The identifier of the project to which the drop is associated. */
  projectId: Scalars['UUID'];
  /** A list of all NFT purchases from this drop. */
  purchases?: Maybe<Array<Purchase>>;
  /**
   * The shutdown_at field represents the date and time in UTC when the drop was shutdown
   * If it is null, the drop is currently not shutdown
   */
  shutdownAt?: Maybe<Scalars['NaiveDateTime']>;
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
  /** The creation process for the drop has failed */
  Failed = 'FAILED',
  /** The minting process for the collection is complete. */
  Minted = 'MINTED',
  /** Actively minting. */
  Minting = 'MINTING',
  /** The drop is temporarily paused and cannot be minted at the moment. */
  Paused = 'PAUSED',
  /** The drop is scheduled for minting. */
  Scheduled = 'SCHEDULED',
  /** The drop is permanently shut down and can no longer be minted. */
  Shutdown = 'SHUTDOWN',
}

/** The input for editing the name of an existing credential by providing the `client_id` of the credential and the new `name` to be assigned. */
export type EditCredentialInput = {
  /** A unique string identifier assigned to the credential during creation. */
  clientId: Scalars['String'];
  /** The new name to be assigned to the credential. */
  name: Scalars['String'];
};

/** The response for editing the name of a credential. */
export type EditCredentialPayload = {
  __typename?: 'EditCredentialPayload';
  /** The updated credential with the edited name. */
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

/** An event to which an external service can subscribe. */
export type EventType = {
  __typename?: 'EventType';
  /** Whether the event is archived or not. */
  archived?: Maybe<Scalars['Boolean']>;
  /** The date and time when the event was created, in string format. */
  createdAt: Scalars['String'];
  /** A description of the event. */
  description: Scalars['String'];
  /** The name of the event. */
  name: Scalars['String'];
  /** The JSON schema for the event payload. */
  schemas: Scalars['JSON'];
  /** The date and time when the event was last updated, in string format. */
  updatedAt: Scalars['String'];
};

/** An enumeration of event types that can be subscribed to by a webhook. */
export enum FilterType {
  /** Event triggered when a new customer is created */
  CustomerCreated = 'CUSTOMER_CREATED',
  /** Event triggered when a new customer treasury is created */
  CustomerTreasuryCreated = 'CUSTOMER_TREASURY_CREATED',
  /** Event triggered when a new wallet is created for a customer */
  CustomerWalletCreated = 'CUSTOMER_WALLET_CREATED',
  /** Event triggered when a new drop is created */
  DropCreated = 'DROP_CREATED',
  /** Event triggered when a new drop is minted */
  DropMinted = 'DROP_MINTED',
  /** Event triggered when a new project is created */
  ProjectCreated = 'PROJECT_CREATED',
  /** Event triggered when a new wallet is created for a project */
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

/** An invitation sent to join a Holaplex organization. */
export type Invite = {
  __typename?: 'Invite';
  /** The datetime, in UTC, when the invitation to join the organization was created. */
  createdAt: Scalars['NaiveDateTime'];
  /** The ID of the user who created the invitation. */
  createdBy: Scalars['UUID'];
  /** The email address of the user being invited to become a member of the organization. */
  email: Scalars['String'];
  /** The ID of the invitation. */
  id: Scalars['UUID'];
  /** The member record that is generated after the invitation to join the organization is accepted. When the user has not accepted the invitation, this field returns `null`. */
  member?: Maybe<Member>;
  /** The organization to which the invitation to join belongs. */
  organization?: Maybe<Organization>;
  /** The ID of the organization to which the invitation belongs. */
  organizationId: Scalars['UUID'];
  /** The status of the invitation. */
  status: InviteStatus;
  /** The datetime, in UTC, when the invitation status was updated. */
  updatedAt?: Maybe<Scalars['NaiveDateTime']>;
};

/** Input required for inviting a member to the organization. */
export type InviteMemberInput = {
  /** The email address of the invited user. */
  email: Scalars['String'];
  /** The ID of the organization. */
  organization: Scalars['UUID'];
};

/** The status of a member invitation. */
export enum InviteStatus {
  /** The member invitation has been accepted by the invited user. */
  Accepted = 'ACCEPTED',
  /** The member invitation has been revoked by an existing member of the organization and is no longer valid. */
  Revoked = 'REVOKED',
  /** The member invitation has been sent to the invited user. */
  Sent = 'SENT',
}

/** A member of a Holaplex organization, representing an individual who has been granted access to the organization. */
export type Member = {
  __typename?: 'Member';
  /** The datetime, in UTC, when the member joined the organization. */
  createdAt: Scalars['NaiveDateTime'];
  /** The datetime, in UTC, when the member was deactivated from the organization. */
  deactivatedAt?: Maybe<Scalars['NaiveDateTime']>;
  /** The unique identifier of the member. */
  id: Scalars['UUID'];
  /** The invitation to join the Holaplex organization that the member accepted in order to gain access to the organization. */
  invite?: Maybe<Invite>;
  /** The ID of the invitation that the member accepted to join the organization. */
  inviteId: Scalars['UUID'];
  /** The Holaplex organization to which the member belongs, representing an individual who has been granted access to the organization. */
  organization?: Maybe<Organization>;
  /** The ID of the Holaplex organization to which the user has been granted access. */
  organizationId: Scalars['UUID'];
  /** The datetime, in UTC, when the member was revoked from the organization. */
  revokedAt?: Maybe<Scalars['NaiveDateTime']>;
  /** The user identity who is a member of the organization. */
  user?: Maybe<User>;
  /** The ID of the user who has been granted access to the Holaplex organization as a member. */
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
  /** The description of the NFT. */
  description: Scalars['String'];
  /** An optional URL where viewers can find more information on the NFT, such as the collection's homepage or Twitter page. */
  externalUrl?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
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
  id: Scalars['UUID'];
  metadataJsonId: Scalars['UUID'];
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
   * Accept an invite to the organization.
   * # Error
   * This mutation will produce an error if it is unable to connect to the database or if the user's email does not match the invitation.
   */
  acceptInvite: AcceptInvitePayload;
  /** Create an API credential to authenticate and authorize API requests to the Holaplex Hub. */
  createCredential: CreateCredentialPayload;
  /** This mutation creates a customer record and a corresponding treasury that holds custodial wallets on behalf of a user. The treasury serves as a way to group the customer's wallets together. This makes it easier to manage wallets and associated assets for the user within a specific project. The customer and treasury are associated with the specified project ID. The response includes the newly created customer record. If there is an error connecting to the database or unable to emit a customer created event, the mutation will fail and an error will be returned. */
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
   * This mutation creates a new Holaplex organization, with the user triggering the mutation automatically assigned as the owner of the organization.
   * # Errors
   * This mutation produces an error if it is unable to connect to the database, emit the organization creation event, or if the user is not set in the X-USER-ID header.
   */
  createOrganization: CreateOrganizationPayload;
  /**
   * This mutation creates a new project under the specified organization.
   *
   * # Errors
   * This mutation produces an error if it is unable to connect to the database, emit the project creation event, or if the user is not set in the X-USER-ID header.
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
   * Returns member object on success
   *
   * # Errors
   * This code may result in an error if the update to the database fails or if it fails to produce an event.
   */
  deactivateMember: Member;
  /** Delete the OAuth2 API credential. */
  deleteCredential: DeleteCredentialPayload;
  /**
   * Res
   *
   * # Errors
   * This function fails if ...
   */
  deleteWebhook: DeleteWebhookPayload;
  /** Edit the name assigned to the API credential. */
  editCredential: EditCredentialPayload;
  /** This mutation edits the name or profile image of the organization. */
  editOrganization: EditOrganizationPayload;
  /** This mutations edits the name and profile image of the project. */
  editProject: EditProjectPayload;
  /**
   * Res
   *
   * # Errors
   * This function fails if ...
   */
  editWebhook: EditWebhookPayload;
  /**
   * To invite a person to the organization, provide their email address.
   * # Error
   * This mutation will produce an error if it is unable to connect to the database or if there is no associated user set in the X-USER-ID header.
   */
  inviteMember: Invite;
  /**
   * This mutation mints an NFT edition for a specific drop ID. The mint returns immediately with a creation status of CREATING. You can [set up a webhook](https://docs.holaplex.dev/hub/For%20Developers/webhooks-overview) to receive a notification when the mint is accepted by the blockchain.
   * # Errors
   * If the mint cannot be saved to the database or fails to be emitted for submission to the desired blockchain, the mutation will result in an error.
   */
  mintEdition: MintEditionPayload;
  /**
   * This mutation allows updating a drop and it's associated collection by ID.
   * It returns an error if it fails to reach the database, emit update events or assemble the on-chain transaction.
   * Returns the `PatchDropPayload` object on success.
   */
  patchDrop: PatchDropPayload;
  /** This mutation allows for the temporary blocking of the minting of editions and can be resumed by calling the resumeDrop mutation. */
  pauseDrop: PauseDropPayload;
  /**
   * Returns member object on success
   *
   * # Errors
   * This code may result in an error if the update to the database fails or if it fails to produce an event.
   */
  reactivateMember: Member;
  /** This mutation resumes a paused drop, allowing minting of editions to be restored */
  resumeDrop: ResumeDropPayload;
  /**
   * Shuts down a drop by writing the current UTC timestamp to the shutdown_at field of drop record.
   * Returns the `Drop` object on success.
   *
   * # Errors
   * Fails if the drop or collection is not found, or if updating the drop record fails.
   */
  shutdownDrop: ShutdownDropPayload;
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

export type MutationDeactivateMemberArgs = {
  input: DeactivateMemberInput;
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

export type MutationPatchDropArgs = {
  input: PatchDropInput;
};

export type MutationPauseDropArgs = {
  input: PauseDropInput;
};

export type MutationReactivateMemberArgs = {
  input: ReactivateMemberInput;
};

export type MutationResumeDropArgs = {
  input: ResumeDropInput;
};

export type MutationShutdownDropArgs = {
  input: ShutdownDropInput;
};

/** A Holaplex organization is the top-level account within the Holaplex ecosystem. Each organization has a single owner who can invite members to join. Organizations use projects to organize NFT campaigns or initiatives. */
export type Organization = {
  __typename?: 'Organization';
  /** The datetime, in UTC, when the Holaplex organization was created by its owner. */
  createdAt: Scalars['NaiveDateTime'];
  /**
   * Get a single API credential by client ID.
   *
   * # Arguments
   *
   * * `ctx` - The GraphQL context object containing the database connection pool and other data.
   * * `client_id` - The client ID of the API credential to retrieve.
   *
   * # Returns
   *
   * The API credential with the specified client ID.
   */
  credential: Credential;
  /**
   * Get a list of API credentials associated with this organization.
   *
   * # Arguments
   *
   * * `ctx` - The GraphQL context object containing the database connection pool and other data.
   * * `limit` - Optional limit on the number of credentials to retrieve.
   * * `offset` - Optional offset for the credentials to retrieve.
   *
   * # Returns
   *
   * A list of API credentials associated with this organization.
   */
  credentials: Array<Credential>;
  /** The datetime, in UTC, when the Holaplex organization was deactivated by its owner. */
  deactivatedAt?: Maybe<Scalars['NaiveDateTime']>;
  /** The unique identifier assigned to the Holaplex organization, which is used to distinguish it from other organizations within the Holaplex ecosystem. */
  id: Scalars['UUID'];
  /** The invitations to join the Holaplex organization that have been sent to email addresses and are either awaiting or have been accepted by the recipients. */
  invites: Array<Invite>;
  /** The members who have been granted access to the Holaplex organization, represented by individuals who have been invited and accepted the invitation to join the organization. */
  members?: Maybe<Array<Member>>;
  /** The name given to the Holaplex organization, which is used to identify it within the Holaplex ecosystem and to its members and users. */
  name: Scalars['String'];
  /** The owner of the Holaplex organization, who has created the organization and has full control over its settings and members. */
  owner?: Maybe<Owner>;
  /** The optional profile image associated with the Holaplex organization, which can be used to visually represent the organization. */
  profileImageUrl?: Maybe<Scalars['String']>;
  /** The projects that have been created and are currently associated with the Holaplex organization, which are used to organize NFT campaigns or initiatives within the organization. */
  projects: Array<Project>;
  /**
   * Retrieves a specific webhook associated with the organization, based on its ID.
   *
   * # Arguments
   *
   * * `ctx` - The context object representing the current request.
   * * `id` - The UUID of the Webhook to retrieve.
   *
   * # Returns
   *
   * The specified Webhook object, or None if it does not exist.
   *
   * # Errors
   *
   * This function will return an error if the data context cannot be retrieved.
   */
  webhook?: Maybe<Webhook>;
  /**
   * Retrieves a list of all webhooks associated with the organization.
   *
   * # Arguments
   *
   * * `ctx` - The context object representing the current request.
   *
   * # Returns
   *
   * A vector of all Webhook objects associated with the Organization, or None if there are none.
   *
   * # Errors
   *
   * This function will return an error if the data context cannot be retrieved.
   */
  webhooks?: Maybe<Array<Webhook>>;
};

/** A Holaplex organization is the top-level account within the Holaplex ecosystem. Each organization has a single owner who can invite members to join. Organizations use projects to organize NFT campaigns or initiatives. */
export type OrganizationCredentialArgs = {
  clientId: Scalars['String'];
};

/** A Holaplex organization is the top-level account within the Holaplex ecosystem. Each organization has a single owner who can invite members to join. Organizations use projects to organize NFT campaigns or initiatives. */
export type OrganizationCredentialsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** A Holaplex organization is the top-level account within the Holaplex ecosystem. Each organization has a single owner who can invite members to join. Organizations use projects to organize NFT campaigns or initiatives. */
export type OrganizationInvitesArgs = {
  status?: InputMaybe<InviteStatus>;
};

/** A Holaplex organization is the top-level account within the Holaplex ecosystem. Each organization has a single owner who can invite members to join. Organizations use projects to organize NFT campaigns or initiatives. */
export type OrganizationWebhookArgs = {
  id: Scalars['UUID'];
};

/** The owner of the Holaplex organization, who is the individual that created the organization. */
export type Owner = {
  __typename?: 'Owner';
  /** The datetime, in UTC, when the organization was created. */
  createdAt: Scalars['NaiveDateTime'];
  /** The unique identifier assigned to the record of the user who created the Holaplex organization and serves as its owner, which is used to distinguish their record from other records within the Holaplex ecosystem. */
  id: Scalars['UUID'];
  /** The Holaplex organization owned by the user. */
  organization?: Maybe<Organization>;
  /** The ID assigned to the Holaplex organization owned by the user, which is used to distinguish it from other organizations within the Holaplex ecosystem." */
  organizationId: Scalars['UUID'];
  /** The user identity associated with the owner of the organization. */
  user?: Maybe<User>;
  /** The ID of the user who created the Holaplex organization and serves as its owner. */
  userId: Scalars['UUID'];
};

/** Input object for patching a drop and associated collection by ID */
export type PatchDropInput = {
  /** The creators of the drop */
  creators?: InputMaybe<Array<CollectionCreatorInput>>;
  /** The new end time for the drop in UTC */
  endTime?: InputMaybe<Scalars['DateTime']>;
  /** The unique identifier of the drop */
  id: Scalars['UUID'];
  /** The new metadata JSON for the drop */
  metadataJson?: InputMaybe<MetadataJsonInput>;
  /** The new price for the drop in the native token of the blockchain */
  price?: InputMaybe<Scalars['Int']>;
  /** The new seller fee basis points for the drop */
  sellerFeeBasisPoints?: InputMaybe<Scalars['Int']>;
  /** The new start time for the drop in UTC */
  startTime?: InputMaybe<Scalars['DateTime']>;
};

/** Represents the result of a successful patch drop mutation. */
export type PatchDropPayload = {
  __typename?: 'PatchDropPayload';
  /** The drop that has been patched. */
  drop: Drop;
};

/** Represents input fields for pausing a drop. */
export type PauseDropInput = {
  drop: Scalars['UUID'];
};

/** Represents the result of a successful pause drop mutation. */
export type PauseDropPayload = {
  __typename?: 'PauseDropPayload';
  /** The drop that has been paused. */
  drop: Drop;
};

/** A Holaplex project that belongs to an organization. Projects are used to group unique NFT campaigns or initiatives, and are used to assign objects that end customers will interact with, such as drops and wallets. */
export type Project = {
  __typename?: 'Project';
  /** The datetime, in UTC, when the project was created. */
  createdAt: Scalars['NaiveDateTime'];
  /** Retrieve a customer record associated with the project, using its ID. */
  customer?: Maybe<Customer>;
  /** Retrieve all customer records associated with a given project. */
  customers?: Maybe<Array<Customer>>;
  /** The date and time in Coordinated Universal Time (UTC) when the Holaplex project was created. Once a project is deactivated, objects that were assigned to the project can no longer be interacted with. */
  deactivatedAt?: Maybe<Scalars['NaiveDateTime']>;
  /** Look up a drop associated with the project by its ID. */
  drop?: Maybe<Drop>;
  /** The drops associated with the project. */
  drops?: Maybe<Array<Drop>>;
  /** The unique identifier assigned to the Holaplex project. */
  id: Scalars['UUID'];
  /** The friendly name assigned to the Holaplex project to differentiate it from other projects belonging to the organization. */
  name: Scalars['String'];
  organization?: Maybe<Organization>;
  /** The ID of the Holaplex organization to which the project belongs. */
  organizationId: Scalars['UUID'];
  /** The optional profile image associated with the project, which can be used to visually represent the project. */
  profileImageUrl?: Maybe<Scalars['String']>;
  /** The treasury assigned to the project, which contains the project's wallets. */
  treasury?: Maybe<Treasury>;
};

/** A Holaplex project that belongs to an organization. Projects are used to group unique NFT campaigns or initiatives, and are used to assign objects that end customers will interact with, such as drops and wallets. */
export type ProjectCustomerArgs = {
  id: Scalars['UUID'];
};

/** A Holaplex project that belongs to an organization. Projects are used to group unique NFT campaigns or initiatives, and are used to assign objects that end customers will interact with, such as drops and wallets. */
export type ProjectDropArgs = {
  id: Scalars['UUID'];
};

/** Represents the purchase of an NFT. */
export type Purchase = {
  __typename?: 'Purchase';
  /** The date and time when the purchase was created. */
  createdAt: Scalars['NaiveDateTime'];
  /** The ID of the drop that facilitated the purchase, if any. */
  dropId?: Maybe<Scalars['UUID']>;
  /** The ID of the purchase. */
  id: Scalars['UUID'];
  /** The ID of the NFT being purchased. */
  mintId: Scalars['UUID'];
  /** The amount spent on the purchase. */
  spent: Scalars['Int'];
  /** The status of the creation of the NFT. */
  status: CreationStatus;
  /** The signature of the transaction, if any. */
  txSignature?: Maybe<Scalars['String']>;
  /** The wallet address of the buyer. */
  wallet: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /**
   * Returns a list of event types that an external service can subscribe to.
   *
   * # Returns
   *
   * A vector of EventType objects representing the different event types that can be subscribed to.
   *
   * # Errors
   *
   * This function returns an error if there was a problem with retrieving the event types.
   */
  eventTypes: Array<EventType>;
  /** Retrieve a member invitation by its ID. */
  invite?: Maybe<Invite>;
  /** Query an organization by its ID, this query returns `null` if the organization does not exist. */
  organization?: Maybe<Organization>;
  /** Query a project by it's ID, this query returns `null` if the project does not exist. */
  project?: Maybe<Project>;
  /** Retrieve a user identity by providing their ID. */
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

export type ReactivateMemberInput = {
  id: Scalars['UUID'];
};

/** Represents input fields for resuming a paused drop. */
export type ResumeDropInput = {
  drop: Scalars['UUID'];
};

/** Represents the result of a successful resume drop mutation. */
export type ResumeDropPayload = {
  __typename?: 'ResumeDropPayload';
  /** The drop that has been resumed. */
  drop: Drop;
};

/** Represents the input fields for shutting down a drop */
export type ShutdownDropInput = {
  drop: Scalars['UUID'];
};

/** Represents the result of a successful shutdown drop mutation */
export type ShutdownDropPayload = {
  __typename?: 'ShutdownDropPayload';
  /** Drop that has been shutdown */
  drop: Drop;
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

/** A unique user identity across the entire Holaplex ecosystem. A user can be associated with multiple organizations, but they are not required to have separate login credentials. */
export type User = {
  __typename?: 'User';
  affiliations: Array<Affiliation>;
  /** The timestamp in UTC when the user identity was created. */
  createdAt: Scalars['String'];
  /** The email address associated with the user identity. */
  email: Scalars['String'];
  /** The first name of the user identity. */
  firstName: Scalars['String'];
  /** The unique identifier for the user identity. */
  id: Scalars['UUID'];
  /** The last name of the user identity. */
  lastName: Scalars['String'];
  /** The timestamp in UTC when the user identity was last updated. */
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

/** A webhook represents an endpoint registered to receive notifications for specific events within a project. */
export type Webhook = {
  __typename?: 'Webhook';
  /** Retrieves the channels the webhook is subscribed to. */
  channels: Array<Scalars['String']>;
  /** Retrieves the creation datetime of the webhook. */
  createdAt: Scalars['NaiveDateTime'];
  /** The user who created the webhook. */
  createdBy?: Maybe<User>;
  /** Retrieves the ID of the user who created the webhook. */
  createdById: Scalars['UUID'];
  /** Retrieves the webhook's description. */
  description: Scalars['String'];
  /** Retrieves the ID of the webhook's endpoint. */
  endpointId: Scalars['String'];
  /** Retrieves the events the webhook is subscribed to. */
  events: Array<FilterType>;
  /** Retrieves the ID of the webhook. */
  id: Scalars['UUID'];
  /** Retrieves the ID of the organization the webhook belongs to. */
  organizationId: Scalars['UUID'];
  /** This field specifies the list of projects for which an associated object will trigger a webhook event. */
  projects: Array<Project>;
  /** Retrieves the last update datetime of the webhook. */
  updatedAt?: Maybe<Scalars['NaiveDateTime']>;
  /** Retrieves the URL of the webhook's endpoint. */
  url: Scalars['String'];
};
