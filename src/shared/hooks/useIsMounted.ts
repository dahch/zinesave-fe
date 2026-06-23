import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * Custom hook to determine if the component is mounted on the client.
 * Safely resolves hydration mismatch issues by delaying client-only rendering
 * until hydration is complete.
 */
export function useIsMounted(): boolean {
    return useSyncExternalStore(
        emptySubscribe,
        getSnapshot,
        getServerSnapshot
    );
}
