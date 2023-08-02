import { MainLayout } from '../../presentation/common/layout/Main.layout';
import { Authenticator } from '@aws-amplify/ui-react';
import { Logo } from '../../presentation/common/components/Logo';
import { HackathonLogo } from '../../presentation/common/components/HackathonLogo';

const components = {
  Header() {
    return (
      <div className="mb-5 flex justify-center">
        <Logo />
      </div>
    );
  },
  Footer() {
    return (
      <div className="mb-5 flex justify-center">
        <HackathonLogo />
      </div>
    );
  },
};

export default function AppLayout({ children }) {
  return (
    <Authenticator socialProviders={['google']} components={components}>
      <MainLayout>{children}</MainLayout>
    </Authenticator>
  );
}
