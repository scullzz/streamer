import Switch from "react-switch";
import style from "./style.module.css";
export interface IParameterPickerElementProps {
  value: any;
  onChange: (value: any) => void;
}

interface ICheckerProps extends IParameterPickerElementProps {
  text: string;
  offColor?: string;
}

export const Checker = ({ value, onChange, text, offColor }: ICheckerProps) => {
  return (
    <div className={style.CheckerBlock}>
      <span className={style.checker_text}>{text}</span>
      <Switch
        onChange={onChange}
        checked={value}
        onColor="#35C759"
        offColor={offColor || "#B0B0B0"}
        onHandleColor="#fff"
        offHandleColor="#fff"
        handleDiameter={26}
        uncheckedIcon={false}
        checkedIcon={false}
        height={30}
        width={49}
        className="react-switch"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        borderRadius={20}
      />
    </div>
  );
};
