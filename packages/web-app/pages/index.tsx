import { redirect } from 'next/navigation';
import NewsFeed from './feed';

export default function Index() {
  return NewsFeed();
}
