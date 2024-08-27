import { CSSProperties, InputHTMLAttributes, useEffect, useRef } from "react";
import question from "./image/question.svg"
import style from "./style.module.css";

interface IFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  withLine?: boolean;
  borderString?: CSSProperties;
}

export const FormInput = ({ withLine, borderString, ...rest }: IFormInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.onfocus = () => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
      };
    }
  }, []);
  useEffect(() => {
    if (inputRef.current) {
      if (rest.value != null && rest.value !== undefined && rest.value != "") {
        inputRef.current.style.color = "var(--text-color)";
      } else {
        inputRef.current.style.color = "#c8c8cd";
      }
    }
  }, [rest.value]);
  return (
    <div className={style.form_ceil} style={borderString}>
      <div className={style.info}>
        <input type="text" {...rest} ref={inputRef} />
        <img src={question} alt="" className={style.icon} />
      </div>
      {withLine && <div className={style.line}></div>}
    </div>
  );
};
