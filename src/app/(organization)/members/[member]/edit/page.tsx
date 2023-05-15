import EditProfile from './EditProfile';

interface EditProfileLayoutProps {
  params: { member: string };
}

export default function EditProfilePage({
  params: { member },
}: EditProfileLayoutProps): React.ReactNode {
  return <EditProfile member={member} />;
}
