'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Icon } from '../../../../../components/Icon';
import Navbar from '../../../../../layouts/Navbar';
import useCreateDropStore from '../../../../../store/useCreateDropStore';

export default function CreateDropLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const slug = pathname ? pathname.split('/')[2] : null;
  console.log(slug);
  console.log(pathname);
  const { stepOne, stepTwo, stepThree } = useCreateDropStore();

  const close = () => {
    router.push(`/projects/${slug}/drops`);
  };

  return (
    <Navbar.Page>
      <Navbar.Panel>
        <Navbar.Header>
          <div className="flex items-center gap-4 px-5 cursor-pointer" onClick={close}>
            <Icon.Close />
            <span className="flex items-center gap-2 text-sm text-primary font-medium">Close</span>
          </div>
        </Navbar.Header>
        <Navbar.Menu>
          <Navbar.Menu.Step
            name="Drop details"
            icon={
              <Navbar.Menu.Step.StepCount
                active={pathname === `/projects/${slug}/drops/create/details`}
                count="1"
                filled={!!stepOne}
              />
            }
            active={pathname === `/projects/${slug}/drops/create/details`}
          />
          <Navbar.Menu.Step
            name="Payment and royalties"
            icon={
              <Navbar.Menu.Step.StepCount
                active={pathname === `/projects/${slug}/drops/create/royalties`}
                count="2"
                filled={!!stepTwo}
              />
            }
            active={pathname === `/projects/${slug}/drops/create/royalties`}
          />
          <Navbar.Menu.Step
            name="Mint date"
            icon={
              <Navbar.Menu.Step.StepCount
                active={pathname === `/projects/${slug}/drops/create/timing`}
                count="3"
                filled={!!stepThree}
              />
            }
            active={pathname === `/projects/${slug}/drops/create/timing`}
          />
          <Navbar.Menu.Step
            name="Final preview"
            icon={
              <Navbar.Menu.Step.StepCount
                active={pathname === `/projects/${slug}/drops/create/preview`}
                count="4"
                filled={false}
              />
            }
            active={pathname === `/projects/${slug}/drops/create/preview`}
          />
        </Navbar.Menu>
      </Navbar.Panel>
      <Navbar.Content>{children}</Navbar.Content>
    </Navbar.Page>
  );
}
