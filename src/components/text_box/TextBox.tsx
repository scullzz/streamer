import { useEffect, useRef } from "react";
import style from "./style.module.css"

interface ITextBoxProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextBox = ({ ...rest }: ITextBoxProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.onfocus = () => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
      };
    }
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;
    const minHeight = 80;

    if (textarea) {
      if (rest.value != null && rest.value !== "") {
        textarea.style.color = "black";
      } else {
        textarea.style.color = "#c8c8cd";
      }

      textarea.style.height = "auto";
      textarea.style.minHeight = `${minHeight}px`;

      if (textarea.scrollHeight > minHeight) {
        textarea.style.minHeight = `${textarea.scrollHeight}px`;
      }
    }
  }, [rest.value]);

  return <textarea className={style.text_box} {...rest} ref={textareaRef} rows={1}></textarea>;
};
