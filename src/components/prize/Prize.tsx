import { useEffect, useState } from "react";
import { formatRaffleDate } from "../../functions/formatRaffleData";
import { NotAvailable } from "../not_available/NotAvailable";
import { PrizeCondition } from "../prize_condition/PrizeCondition";
import correct from "./image/correct.svg";
import raffleIcon from "./image/raffleIcon.svg";
import style from "./style.module.css";
import coins from "./image/coins.svg";

export interface GetRaffleConditionDto {
  isDone: boolean;
  title: string;
}
export interface GetRaffleDto {
  title: string;
  description: string;
  amountOfPrize: number;
  raffleConditions: GetRaffleConditionDto[];
  endTime: string;
  amountOfParticipants: number;
  isParticipant: boolean;
  isCreator: boolean;
  forPreview?: boolean | undefined;
}
interface ITimer {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Prize = ({
  title,
  description,
  raffleConditions,
  isCreator,
  isParticipant,
  endTime,
  forPreview,
  amountOfParticipants,
  amountOfPrize,
}: GetRaffleDto) => {
  const available = new Date(endTime) > new Date();

  const calculateTime = (): ITimer | undefined => {
    try {
      const difference = +new Date(endTime) - +new Date();
      let timeLeft: ITimer = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return timeLeft;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [timeLeft, setTimeLeft] = useState<ITimer | undefined>(calculateTime());
  const onClick = () => {
    try {
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={style.MainPrizeBlock}>
      <div className={style.PrizeDescription}>
        <img src={raffleIcon} alt="$" />
        <p className={style.PrizeDescription_title}>{title}</p>
        <p className={style.PrizeDescription_description}>{description}</p>
      </div>
      <span className={style.header_text}>Для участия:</span>
      <ul className={style.prize_condition}>
        <NotAvailable
          available={raffleConditions.length !== 0}
          text="Нет специальных условий"
        ></NotAvailable>
        {raffleConditions.map((t, i) => (
          <PrizeCondition
            {...t}
            key={i}
            forPreview={forPreview}
          ></PrizeCondition>
        ))}
      </ul>
      {!isParticipant && !isCreator && available && (
        <div className={style.IsNotParticipantBlock}>
          <div className={style.IsNotParticipantBlock_numberOfPrize}>
            <span className={style.numberOfPrize_text}>Призов</span>
            <span className={style.numberOfPrize_number}>{amountOfPrize}</span>
          </div>
          <div className={style.line}></div>
          <div className={style.IsNotParticipantBlock_numberOfPrize}>
            <span className={style.numberOfPrize_text}>Дата окончания</span>
            <span className={style.numberOfPrize_number}>
              {formatRaffleDate(endTime)}
            </span>
          </div>
          <div className={style.line}></div>
          <div className={style.IsNotParticipantBlock_numberOfPrize}>
            <span className={style.numberOfPrize_text}>Осталось</span>
            <span className={style.numberOfPrize_number}>
              {timeLeft?.hours}ч:{timeLeft?.minutes}м:{timeLeft?.seconds}с
            </span>
          </div>
        </div>
      )}
      {isParticipant && available && (
        <div className={style.IsNotParticipantBlock}>
          <div className={style.IsNotParticipantBlock_numberOfPrize}>
            <span className={style.numberOfPrize_text}>Призов</span>
            <span className={style.numberOfPrize_number}>{amountOfPrize}</span>
          </div>
          <div className={style.line}></div>
          <div className={style.IsNotParticipantBlock_numberOfPrize}>
            <span className={style.numberOfPrize_text}>Участников</span>
            <span className={style.numberOfPrize_number}>
              {amountOfParticipants}
            </span>
          </div>
          <div className={style.line}></div>
          <div className={style.IsNotParticipantBlock_numberOfPrize}>
            <span className={style.numberOfPrize_text}>Осталось</span>
            <span className={style.numberOfPrize_number}>
              {timeLeft?.hours}ч:{timeLeft?.minutes}м:{timeLeft?.seconds}с
            </span>
          </div>
        </div>
      )}

      {!isParticipant && !isCreator && available && (
        <button
          className={style.attention_btn}
          onClick={onClick}
          style={{
            marginTop: "20px",
            textTransform: "uppercase",
          }}
        >
          Участвовать
        </button>
      )}
      {isParticipant && available && (
        <div className={style.buttonsFlex}>
          <button
            onClick={onClick}
            className={style.attention_opacity_btn}
            style={{
              width: "100%",
              backgroundColor: "rgba(53, 199, 89, 0.3)",
              color: "#35C759",
              marginTop: "20px",
              columnGap: "20px",
            }}
          >
            <img src={correct} className={style.icon} />
            Вы участвуете (1 билет)
          </button>
          <button className={style.buy_extra_one_bt}>
            Купить еще 1 билет участника
          </button>
          <span className={style.extra_one_price}>
            Стоимость: <img src={coins} alt="$" /> 100
          </span>
        </div>
      )}
      {!available && (
        <button
          onClick={onClick}
          className={style.attention_opacity_btn}
          style={{
            marginTop: "20px",
            textTransform: "uppercase",
          }}
        >
          Подробнее
        </button>
      )}
    </div>
  );
};

export default Prize;
