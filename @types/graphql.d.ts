
declare module '*/invite.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const InviteMember: DocumentNode;

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
  export const GetProject: DocumentNode;
export const GetProjectDrops: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/user.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetUserAffiliations: DocumentNode;

  export default defaultDocument;
}
    