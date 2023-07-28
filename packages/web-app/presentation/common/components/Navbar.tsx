import { PropsWithChildren } from 'react';

export function Navbar({ children }: PropsWithChildren) {
  return <div className="bg-white shadow-sm">{children}</div>;
}
