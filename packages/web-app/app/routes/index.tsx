import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export const loader = async () => {
  return redirect('/feed');
};

export default function Index() {
  useLoaderData<typeof loader>();
  return <></>;
}
