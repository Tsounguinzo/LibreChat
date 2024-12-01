import React, { useEffect } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { useAuthContext } from '~/hooks/AuthContext';
import { useLocation } from 'react-router-dom';

export const PosthogProvider = ({ children }) => {
  const location = useLocation();
  const { user } = useAuthContext();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      posthog.init(process.env.REACT_APP_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
        person_profiles: 'identified_only',
        capture_pageview: false, // Disable automatic pageview capture, as we capture manually
        capture_pageleave: true,
      });
    }
  }, []);

  useEffect(() => {
    if (user) {
      posthog.identify(user.id, {
        email: user.email,
        name: user.name,
      });

      posthog.capture('$pageview', {
        distinct_id: user.id,
        url: window.location.href,
        path: location.pathname,
      });
    }
  }, [location, user]);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};
