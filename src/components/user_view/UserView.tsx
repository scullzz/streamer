import { useNavigate } from "react-router-dom";
import { SectionHeader } from "../section_header/SectionHeader";
import style from "./style.module.css";
import { StreamerPreview } from "../streamer_preview/StreamerPreview";

const UserView = () => {
  const nav = useNavigate();

  const CloseHandle = () => {
    nav("/menu");
  };
  return (
    <div className={style.UserViewBlock}>
      <SectionHeader
        left={<span onClick={() => CloseHandle()}>Закрыть</span>}
        center={<span>Профиль</span>}
        right={<span>Готово</span>}
      ></SectionHeader>
      <div className="mt" style={{ marginTop: "25px" }}></div>
      <StreamerPreview
        headerStyles={{ marginTop: "15px", lineHeight: "23px" }}
        url={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiE26ff46aKpfHCPy88HJkziodR9zd2jFhlg&s"
        }
        name={"Пользователь"}
        details="Подписан с 21 февраля 2023 г"
        isLive={false}
      ></StreamerPreview>
    </div>
  );
};

export default UserView;
