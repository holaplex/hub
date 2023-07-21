declare module '*/credential.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const CreateCredential: DocumentNode;
  export const EditCredential: DocumentNode;
  export const DeleteCredential: DocumentNode;

  export default defaultDocument;
}

declare module '*/drop.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const CreateDrop: DocumentNode;
  export const PatchDrop: DocumentNode;
  export const PauseDrop: DocumentNode;
  export const ResumeDrop: DocumentNode;
  export const ShutdownDrop: DocumentNode;
  export const RetryDrop: DocumentNode;
  export const GetOrganizationDrops: DocumentNode;
  export const GetProjectDrops: DocumentNode;
  export const GetDrop: DocumentNode;
  export const GetDropBasicDetail: DocumentNode;

  export default defaultDocument;
}

declare module '*/invite.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const InviteMember: DocumentNode;
  export const AcceptInvite: DocumentNode;
  export const GetInvite: DocumentNode;

  export default defaultDocument;
}

declare module '*/member.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const DeactivateMember: DocumentNode;
  export const ReactivateMember: DocumentNode;

  export default defaultDocument;
}

declare module '*/mint.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const MintEdition: DocumentNode;
  export const RetryMintEdition: DocumentNode;
  export const GetCollectionMints: DocumentNode;

  export default defaultDocument;
}

declare module '*/organization.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const CreateOrganization: DocumentNode;
  export const EditOrganization: DocumentNode;
  export const GetOrganizationProjects: DocumentNode;
  export const GetOrganizationBasicInfo: DocumentNode;
  export const GetOrganizationMembers: DocumentNode;

  export default defaultDocument;
}

declare module '*/project.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const CreateProject: DocumentNode;
  export const EditProject: DocumentNode;
  export const GetProject: DocumentNode;

  export default defaultDocument;
}

declare module '*/webhook.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const CreateWebhook: DocumentNode;
  export const DeleteWebhook: DocumentNode;
  export const EditWebhook: DocumentNode;

  export default defaultDocument;
}

declare module '*/collections.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetProjectCollections: DocumentNode;
  export const GetProjectCollection: DocumentNode;
  export const GetProjectCollectionMints: DocumentNode;
  export const GetProjectCollectionHolders: DocumentNode;

  export default defaultDocument;
}

declare module '*/credentials.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetOrganizationCredentials: DocumentNode;
  export const GetOrganizationCredential: DocumentNode;

  export default defaultDocument;
}

declare module '*/credits.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetOrganizationCreditBalance: DocumentNode;
  export const GetOrganizationCreditAndDeductionTotals: DocumentNode;
  export const GetOrganizationCreditDeposits: DocumentNode;
  export const GetCreditSheet: DocumentNode;

  export default defaultDocument;
}

declare module '*/customer.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetProjectCustomers: DocumentNode;
  export const GetCustomerBasicDetail: DocumentNode;
  export const GetWallets: DocumentNode;
  export const GetCustomerNfts: DocumentNode;

  export default defaultDocument;
}

declare module '*/holder.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetCollectionHolders: DocumentNode;

  export default defaultDocument;
}

declare module '*/purchase.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetCollectionPurchases: DocumentNode;

  export default defaultDocument;
}

declare module '*/treasury.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetTreasuryWallets: DocumentNode;

  export default defaultDocument;
}

declare module '*/user.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetUserAffiliations: DocumentNode;
  export const GetUser: DocumentNode;

  export default defaultDocument;
}

declare module '*/webhooks.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetOrganizationWebhooks: DocumentNode;
  export const GetOrganizationWebhook: DocumentNode;

  export default defaultDocument;
}
