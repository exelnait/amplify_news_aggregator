import { redirect } from 'next/navigation';

export function Index() {
  redirect('/feed');
}

export default Index;
