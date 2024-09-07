import img from "./image/img.svg"
import { useRef } from "react";
import style from "./style.module.css";

export interface IParameterPickerElementProps {
  value: any;
  onChange: (value: any) => void;
}

export const CreatePostFilePicker = ({
  onChange,
}: IParameterPickerElementProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onChange(event.target.files[event.target.files.length - 1]);
    }
  };
  return (
    <div className={style.create_post_file_packer}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <button className={style.picker} onClick={handleButtonClick}>
        <img src={img} alt="" className="icon" />
        Прикрепить медиафайл
      </button>
    </div>
  );
};
