import 'regenerator-runtime/runtime';
import { createRoot } from 'react-dom/client';
import App from './App';
import './style.css';
import './mobile.css';
import { ApiErrorBoundaryProvider } from './hooks/ApiErrorBoundaryContext';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

const container = document.getElementById('root');
const root = createRoot(container);

if (typeof window !== 'undefined') {
  posthog.init('phc_lc8S8T8PkN3FuqqwIp9Yfw0pi53ik7dt7qOyWyQ2eC2', {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'always',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug(); // debug mode in development
    },
  });
}

root.render(
  <ApiErrorBoundaryProvider>
    <PostHogProvider client={posthog}>
      <App />
    </PostHogProvider>
  </ApiErrorBoundaryProvider>,
);
