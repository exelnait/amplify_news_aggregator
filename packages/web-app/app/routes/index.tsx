import { redirect } from '@remix-run/node';

export const loader = async () => {
  redirect('/feed');
};

export default function Index() {
  return <div>Index</div>;
}
