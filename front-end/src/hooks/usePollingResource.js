import { useEffect, useState } from "react";

const DEFAULT_INITIAL_DATA = [];
const DEFAULT_INTERVAL_MS = 10000;

function usePollingResource({
  enabled = true,
  fetchResource,
  initialData = DEFAULT_INITIAL_DATA,
  intervalMs = DEFAULT_INTERVAL_MS,
  onError = console.error,
  refreshKey = 0,
  resetOnDisabled = true,
  resetOnError = false,
}) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    let active = true;
    let intervalId;

    const loadResource = async () => {
      if (!enabled) {
        if (resetOnDisabled) setData(initialData);
        return;
      }

      try {
        const nextData = await fetchResource();
        if (active) setData(nextData);
      } catch (error) {
        onError(error);
        if (active && resetOnError) setData(initialData);
      }
    };

    loadResource();

    if (enabled) {
      intervalId = window.setInterval(loadResource, intervalMs);
    }

    return () => {
      active = false;
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [
    enabled,
    fetchResource,
    initialData,
    intervalMs,
    onError,
    refreshKey,
    resetOnDisabled,
    resetOnError,
  ]);

  return [data, setData];
}

export default usePollingResource;
