import { useEffect, useRef } from "react";
export function useClickOutside(handler, eventCapturePhase = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) handler();
      }
      document.addEventListener("click", handleClick, eventCapturePhase);

      return () =>
        document.removeEventListener("click", handleClick, eventCapturePhase);
    },
    [handler, eventCapturePhase]
  );
  return { ref };
}
