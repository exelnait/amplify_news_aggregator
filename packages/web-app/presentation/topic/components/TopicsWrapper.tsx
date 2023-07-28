import { PropsWithChildren } from 'react';

export function TopicsWrapper(props: PropsWithChildren) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
      <div className="px-4 py-5 sm:px-6">{props.children}</div>
    </div>
  );
}
