import { HTMLAttributes } from "react";
import style from "./style.module.css";
interface IMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  icon?: string;
  label: string;
  onIcon?: string;
  active: boolean;
}

const MenuItem = ({ icon, onIcon, label, active, ...rest }: IMenuItemProps) => {
  return (
    <div className={style.menu_item} {...rest}>
      <img src={active ? onIcon : icon} className={style.menu_item_icon} />
      <span
        className={`${style.menu_item__label} ${
          active ? style.menu_item__label_active : ""
        }`}
      >
        {label}
      </span>
    </div>
  );
};

export default MenuItem;
