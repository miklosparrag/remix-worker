// src/components/DisablePreviewMode.tsx

import { useEffect, useState } from "react";

export function DisablePreviewMode() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(window === window.parent && !window.opener);
  }, []);

  return show && <a href="/api/preview-mode/disable">Disable Preview Mode</a>;
}
