import { useEffect, useState } from "react";

function useEventVersion(eventName) {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const bumpVersion = () => setVersion((currentVersion) => currentVersion + 1);

    window.addEventListener(eventName, bumpVersion);
    return () => window.removeEventListener(eventName, bumpVersion);
  }, [eventName]);

  return version;
}

export default useEventVersion;
