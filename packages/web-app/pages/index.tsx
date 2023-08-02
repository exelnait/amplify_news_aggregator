import { Logo } from '../presentation/common/components/Logo';
import styles from './index.module.css';
import { useAuthenticator } from '@aws-amplify/ui-react';

export default function Index() {
  const { user } = useAuthenticator();
  return (
    <>
      <div className="bg-transparent absolute h-screen w-screen z-50">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav
            className="flex items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Amplify News Aggregator</span>
                <Logo />
              </a>
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <a
                href="/app/feed"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {!user ? 'Sign in' : 'Go to the app'}{' '}
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </nav>
        </header>

        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          ></div>
          <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Explore the app&apos;s inspiring journey on{' '}
                <a
                  href="https://tlavrk.hashnode.dev/building-a-news-aggregator-app-with-aws-amplify-flutter-and-react-a-comprehensive-guide"
                  target="_blank"
                  className="font-semibold text-indigo-600"
                >
                  <span className="absolute inset-0" aria-hidden="true"></span>
                  Hashnode <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Stay Informed.
                <br />
                Explore the World of News!
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Discover the latest stories from RSS feeds, videos from YouTube,
                and podcasts from Apple Podcasts,
                <br />
                all in one place.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  <a href="/app/feed">Get started</a>
                </button>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          ></div>
        </div>
      </div>
      <div className={styles.area}>
        <ul className={styles.circles}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
}
