import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import posthog from 'posthog-js';
import {useRecoilValue} from "recoil";
import store from '~/store';

export const PostHogTracker = () => {
    const user = useRecoilValue(store.user);
    const location = useLocation();

    useEffect(() => {
        if (user) {
            posthog.identify(user.id, {
                email: user.email,
                name: user.name,
            });
        } else {
            posthog.reset();
        }
    }, [user]);

    useEffect(() => {
        posthog.capture('$pageview', {
            distinct_id: user?.id,
            url: window.location.href,
            path: location.pathname,
        });
    }, [location]);

    return null;
};