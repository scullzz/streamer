import Switch from "react-switch";
import style from "./style.module.css";
export interface IParameterPickerElementProps {
  value: any;
  onChange: (value: any) => void;
}

interface ICheckerProps extends IParameterPickerElementProps {
  text: string;
  color?: string;
  status: boolean;
}

export const Checker = ({
  value,
  onChange,
  text,
  color,
  status,
}: ICheckerProps) => {
  return (
    <div className={style.CheckerBlock}>
      <span className={style.checker_text}>{text}</span>
      <Switch
        onChange={onChange}
        checked={value}
        onColor={color || "#35C759"}
        offColor="#B0B0B0"
        onHandleColor="#fff"
        offHandleColor="#fff"
        handleDiameter={26}
        uncheckedIcon={false}
        checkedIcon={false}
        height={30}
        width={49}
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        borderRadius={20}
        disabled={status}
      />
    </div>
  );
};
