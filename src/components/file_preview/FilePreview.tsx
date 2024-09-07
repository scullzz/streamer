import React, { useEffect, useRef, useState } from "react";
import { handleFiles } from "../../functions/handleFiles";

interface IFilePreviewProps {
  file: File | null;
  style?: React.CSSProperties;
}
export const FilePreview = ({ file, style }: IFilePreviewProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  let handledFiles = [];
  const [elemNode, setElemNode] = useState<React.ReactNode | null>(null);
  useEffect(() => {
    if (file) {
      handledFiles = handleFiles([file]);
      setElemNode(null);
      if (ref.current) {
        ref.current.childNodes.forEach((child) => {
          if (
            (child.nodeName === "VIDEO" || child.nodeName === "IMG") &&
            ref.current
          ) {
            ref.current.removeChild(child);
          }
        });
      }

      handledFiles.forEach((e) => {
        if (!React.isValidElement(e)) {
          const el = e as HTMLElement;
          if (el.nodeName === "VIDEO") el.setAttribute("autoplay", "true");
          el.classList.add("cover");
        }
      });
      const elem: any = handledFiles[0];

      if (React.isValidElement(elem)) {
        setElemNode(elem);
      } else {
        if (ref.current) {
          ref.current.prepend(elem);
        }
      }
    }
  }, [file]);
  return (
    <div ref={ref} className="cover" style={style}>
      {elemNode}
    </div>
  );
};
