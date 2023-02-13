'use client';
import { usePathname } from 'next/navigation';
import { Icon } from '../../../../../../components/Icon';
import Navbar from '../../../../../../layouts/Navbar';
import useCreateDropStore from '../../../../../../store/useCreateDropStore';
import Link from 'next/link';

interface CreateDropProps {
  children: React.ReactNode;
  project: string;
}

export default function CreateDrop({ children, project }: CreateDropProps): JSX.Element {
  const pathname = usePathname();

  const { stepOne, stepTwo, stepThree } = useCreateDropStore();

  return (
    <Navbar.Page>
      <Navbar.Panel>
        <Navbar.Header>
          <Link href={`/projects/${project}/drops`} className="flex items-center gap-4 px-5 cursor-pointer">
            <Icon.Close />
            <span className="flex items-center gap-2 text-sm text-primary font-medium">Close</span>
          </Link>
        </Navbar.Header>
        <Navbar.Menu>
          <Navbar.Menu.Step
            name="Drop details"
            icon={
              <Navbar.Menu.Step.StepCount
                active={pathname === `/projects/${project}/drops/create/details`}
                count="1"
                filled={!!stepOne}
              />
            }
            active={pathname === `/projects/${project}/drops/create/details`}
          />
          <Navbar.Menu.Step
            name="Payment and royalties"
            icon={
              <Navbar.Menu.Step.StepCount
                active={pathname === `/projects/${project}/drops/create/royalties`}
                count="2"
                filled={!!stepTwo}
              />
            }
            active={pathname === `/projects/${project}/drops/create/royalties`}
          />
          <Navbar.Menu.Step
            name="Mint date"
            icon={
              <Navbar.Menu.Step.StepCount
                active={pathname === `/projects/${project}/drops/create/timing`}
                count="3"
                filled={!!stepThree}
              />
            }
            active={pathname === `/projects/${project}/drops/create/timing`}
          />
          <Navbar.Menu.Step
            name="Final preview"
            icon={
              <Navbar.Menu.Step.StepCount
                active={pathname === `/projects/${project}/drops/create/preview`}
                count="4"
                filled={false}
              />
            }
            active={pathname === `/projects/${project}/drops/create/preview`}
          />
        </Navbar.Menu>
      </Navbar.Panel>
      <Navbar.Content>{children}</Navbar.Content>
    </Navbar.Page>
  );
}
