import React, { PropsWithChildren } from 'react';
import { Sidebar, Logo, Navbar, HackathonLogo } from '../common.presentation';

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid min-h-screen grid-rows-header bg-zinc-100">
      <Navbar>
        <Logo />
      </Navbar>
      <div className="grid grid-cols-sidebar">
        <div className="h-screen">
          <Sidebar />
          <HackathonLogo />
        </div>
        <div className="w-full flex">{children}</div>
      </div>
    </div>
  );
}
