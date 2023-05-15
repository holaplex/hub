import EditProfile from './ResetPassword';

interface EditProfileLayoutProps {
  params: { member: string };
}

export default function ResetPasswordPage({
  params: { member },
}: EditProfileLayoutProps): React.ReactNode {
  return <EditProfile member={member} />;
}
