import { useEffect, useState } from "react";

export const useCheckImageCorrect = (url?: any ) => {
  const [correct, setCorrect] = useState(false);
  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      if (
        url != null &&
        url != "undefined" &&
        url != undefined &&
        url != "null" &&
        url != ""
      ) {
        setCorrect(true);
        console.log(url);
      }
    };
    image.onerror = () => {
      setCorrect(false);
    };
    image.src = url;
  }, [url]);
  return correct;
};
