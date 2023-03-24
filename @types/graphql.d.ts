
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
export const GetProjectDrops: DocumentNode;
export const GetDrop: DocumentNode;

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
    

declare module '*/organization.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const CreateOrganization: DocumentNode;
export const GetOrganizationProjects: DocumentNode;
export const GetOrganizationBasicInfo: DocumentNode;
export const GetOrganizationMembers: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/project.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const CreateProject: DocumentNode;
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
    

declare module '*/credentials.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetOrganizationCredentials: DocumentNode;
export const GetOrganizationCredential: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/customer.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetProjectCustomers: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/holder.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetCollectionHolders: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/mint.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetCollectionMints: DocumentNode;

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
    