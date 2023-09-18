'use client';

import Typography, { Size } from '../../../../../components/Typography';
import { useProject } from '../../../../../hooks/useProject';
import { GetProjectAnalytics } from '../../../../../queries/analytics.graphql';
import { Project } from '../../../../../graphql.types';
import { ResponsiveBar } from '@nivo/bar';
import { useQuery } from '@apollo/client';

interface GetProjectAnalyticsData {
  project: Pick<Project, 'id' | 'analytics'>;
}

interface GetProjectAnalyticsVars {
  project: string;
}

export default function ProjectAnalytics() {
  const { project } = useProject();

  const analyticsQuery = useQuery<GetProjectAnalyticsData, GetProjectAnalyticsVars>(
    GetProjectAnalytics,
    {
      variables: { project: project?.id as string },
    }
  );

  return (
    <div className="flex flex-col px-6 py-6">
      <Typography.Header size={Size.H1}>Analytics for {project?.name as string}</Typography.Header>
    </div>
  );
}
