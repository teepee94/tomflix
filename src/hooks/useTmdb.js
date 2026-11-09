import { useEffect, useState } from "react";
import tmdb from "../resources/js/TMDB/Axios";

// Module-level caches shared by every component using the hook:
// - `inFlight` de-duplicates concurrent requests for the same endpoint, so
//   two components asking for the same list trigger a single network call.
// - `resolved` lets a remounting component render cached data immediately.
const inFlight = new Map();
const resolved = new Map();

export function fetchTmdb(endpoint) {
    if (resolved.has(endpoint)) {
        return Promise.resolve(resolved.get(endpoint));
    }

    if (!inFlight.has(endpoint)) {
        const request = tmdb
            .get(endpoint)
            .then((response) => {
                const results = response.data?.results ?? [];
                resolved.set(endpoint, results);
                return results;
            })
            .finally(() => {
                // Failed requests are dropped too, so a later mount can retry.
                inFlight.delete(endpoint);
            });

        inFlight.set(endpoint, request);
    }

    return inFlight.get(endpoint);
}

export function clearTmdbCache() {
    inFlight.clear();
    resolved.clear();
}

/**
 * Fetches a TMDB list endpoint and returns its `results` array.
 *
 * @param {string} endpoint path relative to the TMDB base URL
 * @returns {{ data: object[] | null, loading: boolean, error: Error | null }}
 */
export default function useTmdb(endpoint) {
    const [state, setState] = useState(() => {
        const cached = resolved.get(endpoint);
        return { data: cached ?? null, loading: !cached, error: null };
    });

    useEffect(() => {
        if (!endpoint) return undefined;

        // The request is shared between components, so it is not aborted on
        // unmount; instead we ignore the result once this effect is cleaned up
        // (unmount, endpoint change, or React StrictMode's dev double-invoke).
        let ignore = false;

        const cached = resolved.get(endpoint);
        if (cached) {
            setState({ data: cached, loading: false, error: null });
            return undefined;
        }

        setState((prev) => ({ ...prev, loading: true, error: null }));

        fetchTmdb(endpoint)
            .then((data) => {
                if (!ignore) setState({ data, loading: false, error: null });
            })
            .catch((error) => {
                if (!ignore) setState({ data: null, loading: false, error });
            });

        return () => {
            ignore = true;
        };
    }, [endpoint]);

    return state;
}
