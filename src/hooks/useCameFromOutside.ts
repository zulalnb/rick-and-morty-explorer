import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function useCameFromOutside() {
  const pathname = usePathname();
  const [isExternalEntry, setIsExternalEntry] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
      setIsExternalEntry(true);
      sessionStorage.setItem("hasVisited", "true");
    } else {
      setIsExternalEntry(false);
    }
  }, [pathname]);

  return isExternalEntry;
}
