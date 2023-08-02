import {
  AccountSettings,
  Divider,
  Button,
  useAuthenticator,
} from '@aws-amplify/ui-react';
import AppLayout from '../layout';

export default function Settings() {
  const { user, signOut } = useAuthenticator();
  console.log(user);
  return (
    <div className="mx-auto w-full max-w-[600px] p-3 flex flex-col gap-4">
      <AccountSettings.ChangePassword />
      <Divider orientation="horizontal" />
      <Button isFullWidth={true} loadingText="" onClick={signOut}>
        Sign out
      </Button>
      <AccountSettings.DeleteUser />
    </div>
  );
}
Settings.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
