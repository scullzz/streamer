import style from "./style.module.css"
interface IHeaderProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export const SectionHeader = ({ center, left, right }: IHeaderProps) => {
  return (
    <div className={style.section_header}>
      <span className={style.section_header_left}>{left}</span>
      <span className={style.section_header_center}>{center}</span>
      <span className={style.section_header_right}>{right}</span>
    </div>
  );
};