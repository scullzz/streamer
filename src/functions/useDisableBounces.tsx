import { useEffect } from "react";

export const useDisableBounces = (classname: string) => {
  useEffect(() => {
    const streamersEl = document.querySelector(
      `.${classname}`
    ) as HTMLDivElement;
    const canScroll = (el: HTMLElement): boolean => {
      return el.scrollHeight > el.clientHeight;
    };
    const onScroll = (e: TouchEvent) => {
      let target = e.target as HTMLElement;
      while (target && target !== streamersEl) {
        if (canScroll(target)) {
          return;
        }
        target = target.parentNode as HTMLElement;
      }
      e.preventDefault();
    };
    if (streamersEl != null) {
      streamersEl.addEventListener("touchmove", onScroll, { passive: false });
    }
    return () => {
      if (streamersEl != null) {
        streamersEl.removeEventListener("touchmove", onScroll);
      }
    };
  }, []);
};
