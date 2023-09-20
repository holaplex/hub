'use client';
import { Drop } from '../../../../../../../graphql.types';
import { GetDropQueuedMints } from './../../../../../../../queries/drop.graphql';
import { useQuery } from '@apollo/client';
import { Icon } from '../../../../../../../components/Icon';
import { PopoverBox } from '@holaplex/ui-library-react';
import Link from 'next/link';

interface GetDropQueuedMintsData {
  drop: Drop;
}

interface GetDropQueuedMintsVars {
  drop: string;
}

interface SupplyProps {
  drop: string;
  project: string;
}

export default function Supply({ drop, project }: SupplyProps) {
  const queuedMintsQuery = useQuery<GetDropQueuedMintsData, GetDropQueuedMintsVars>(
    GetDropQueuedMints,
    {
      variables: { drop },
    }
  );

  const queuedMints = queuedMintsQuery.data?.drop.queuedMints || [];
  const hasQueuedMints = queuedMints.length > 0;

  return (
    <div className="w-full flex justify-center">
      {queuedMintsQuery.loading ? (
        <div className="w-full grid grid-cols-2 gap-4 xs:grid-col-3 lg:grid-cols-4 xl:grid-cols-6">
          {Array.from(Array(12)).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 items-center justify-center p-2 bg-stone-900 rounded-lg animate-pulse"
            >
              <div className="w-full aspect-square object-cover bg-stone-800" />
              <div className="w-full flex justify-between items-center">
                <span className="bg-stone-800 h-4 w-20 rounded-full" />
                <div className="bg-stone-800 h-6 w-8 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      ) : hasQueuedMints ? (
        <div className="w-full grid grid-cols-2 gap-4 xs:grid-col-3 lg:grid-cols-4 xl:grid-cols-6">
          {queuedMints.map((mint) => {
            return (
              <div
                className="flex flex-col gap-2 items-center justify-center p-2 bg-stone-900 rounded-lg"
                key={mint.id}
              >
                <img src={mint.metadataJson?.image} className="w-full aspect-square object-cover" />
                <div className="w-full flex justify-between">
                  <span className="text-gray-400 text-xs text-ellipsis flex items-center">
                    {mint.metadataJson?.name}
                  </span>
                  <PopoverBox
                    triggerButton={
                      <div className="px-2 py-1 rounded-md hover:bg-stone-800 inline-block cursor-pointer">
                        <Icon.More />
                      </div>
                    }
                    elements={[
                      <Link
                        key="edit_project"
                        className="flex gap-2 items-center"
                        href={`/projects/${project}/drops/${drop}/supply/${mint.id}/mint`}
                      >
                        <span>Mint to wallet</span>
                      </Link>,
                    ]}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-gray-400 w-full text-center max-w-md mt-8">
          This drop doesn&apos;t have any supply yet. Add supply using our CLI.{' '}
          <a href="#" className="text-yellow-300 hover:underline hover:text-yellow-500 transition">
            Learn how here
          </a>
        </div>
      )}
    </div>
  );
}
