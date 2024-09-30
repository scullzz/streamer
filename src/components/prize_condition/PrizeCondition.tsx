import Done from "./image/done.svg";
import notDone from "./image/notDone.svg";
import style from "./style.module.css";
export const PrizeCondition = ({ isDone = false, description }: any) => {
  return (
    <li className={style.prize_condition}>
      <img src={isDone ? Done : notDone} className={style.icon} />
      <span className={style.details_text} style={{ marginTop: 0 }}>
        {description}
      </span>
    </li>
  );
};
