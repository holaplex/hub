'use client';
import { usePathname } from 'next/navigation';
import { Icon } from '../../../../components/Icon';
import Navbar from '../../../../layouts/Navbar';

export default function CreateDropLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const pathname = usePathname();
  const slug = pathname ? pathname.split('/')[2] : null;
  console.log('pathname', pathname);

  return (
    <Navbar.Page>
      <Navbar.Panel>
        <Navbar.Header>
          <div className="flex items-center gap-4 px-5">
            <Icon.Close />
            <span className="flex items-center gap-2 text-sm text-primary font-medium">Close</span>
          </div>
        </Navbar.Header>
        <Navbar.Menu>
          <Navbar.Menu.Item
            name="Drop details"
            icon={<Navbar.Menu.Item.StepCount active={true} count="1" />}
            href={`/organizations/${slug}/projects`}
            active={pathname === `/organizations/${slug}/projects`}
          />
          <Navbar.Menu.Item
            name="Payment and royalties"
            icon={<Navbar.Menu.Item.StepCount active={false} count="2" />}
            href={`/organizations/${slug}/members`}
            active={pathname === `/organizations/${slug}/members`}
          />
          <Navbar.Menu.Item
            name="Mint date"
            icon={<Navbar.Menu.Item.StepCount active={false} count="3" />}
            href={`/organizations/${slug}/settings`}
            active={pathname === `/organizations/${slug}/settings`}
          />
          <Navbar.Menu.Item
            name="Final preview"
            icon={<Navbar.Menu.Item.StepCount active={false} count="4" />}
            href={`/organizations/${slug}/settings`}
            active={pathname === `/organizations/${slug}/settings`}
          />
        </Navbar.Menu>
      </Navbar.Panel>
      <Navbar.Content>{children}</Navbar.Content>
    </Navbar.Page>
  );
}
