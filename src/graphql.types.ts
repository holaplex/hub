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

export type Affiliation = Member | Owner;

export type CreateCredentialInput = {
  name: Scalars['String'];
  organization: Scalars['UUID'];
  projects: Array<Scalars['UUID']>;
};

export type CreateCredentialPayload = {
  __typename?: 'CreateCredentialPayload';
  clientSecret: Scalars['String'];
  credential: Credential;
  registrationAccessToken?: Maybe<Scalars['String']>;
  registrationClientUri?: Maybe<Scalars['String']>;
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

export type CreateWebhookInput = {
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

export type Credential = {
  __typename?: 'Credential';
  clientId: Scalars['String'];
  createdAt: Scalars['NaiveDateTime'];
  createdBy: Scalars['UUID'];
  id: Scalars['UUID'];
  name: Scalars['String'];
  organizationId: Scalars['UUID'];
};

export type DeleteCredentialPayload = {
  __typename?: 'DeleteCredentialPayload';
  credential: Scalars['UUID'];
};

export type DeleteWebhookPayload = {
  __typename?: 'DeleteWebhookPayload';
  appId: Scalars['String'];
  endpoint: Scalars['String'];
  organizationId: Scalars['UUID'];
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
  CredentialCreated = 'CREDENTIAL_CREATED',
  CredentialDeleted = 'CREDENTIAL_DELETED',
  InvitationAccepted = 'INVITATION_ACCEPTED',
  InvitationRevoked = 'INVITATION_REVOKED',
  InvitationSent = 'INVITATION_SENT',
  ProjectCreated = 'PROJECT_CREATED',
  ProjectDeactivated = 'PROJECT_DEACTIVATED',
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
  inviteMember: Invite;
};

export type MutationAcceptInviteArgs = {
  input: AcceptInviteInput;
};

export type MutationCreateCredentialArgs = {
  input: CreateCredentialInput;
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
  id: Scalars['UUID'];
};

export type MutationDeleteWebhookArgs = {
  input: CreateWebhookInput;
};

export type MutationInviteMemberArgs = {
  input: InviteMemberInput;
};

export type Organization = {
  __typename?: 'Organization';
  createdAt: Scalars['NaiveDateTime'];
  credentials?: Maybe<Array<Credential>>;
  deactivatedAt?: Maybe<Scalars['NaiveDateTime']>;
  id: Scalars['UUID'];
  invites: Array<Invite>;
  members?: Maybe<Array<Member>>;
  name: Scalars['String'];
  owner?: Maybe<Owner>;
  projects: Array<Project>;
  svixAppId: Scalars['String'];
};

export type OrganizationInvitesArgs = {
  status?: InputMaybe<InviteStatus>;
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
  deactivatedAt?: Maybe<Scalars['NaiveDateTime']>;
  id: Scalars['UUID'];
  name: Scalars['String'];
  organization?: Maybe<Organization>;
  organizationId: Scalars['UUID'];
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
  user: User;
  users: Array<User>;
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

export type QueryUsersArgs = {
  page?: Scalars['Int'];
  perPage?: Scalars['Int'];
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

export type Webhook = {
  __typename?: 'Webhook';
  createdAt: Scalars['NaiveDateTime'];
  createdBy: Scalars['UUID'];
  endpointId: Scalars['String'];
  id: Scalars['UUID'];
  organizationId: Scalars['UUID'];
  projects?: Maybe<Array<Project>>;
  updatedAt?: Maybe<Scalars['NaiveDateTime']>;
};
