import { useState } from "react";
import { SectionHeader } from "../section_header/SectionHeader";
import style from "./style.module.css";
import { StreamerPreview } from "../streamer_preview/StreamerPreview";
import { FormInput } from "../form_input/FormInput";
import { useNavigate } from "react-router-dom";

interface GetUserProfile {
  id: number;
  tgId: string;
  email: string | null;
  firstName: string;
  lastName: string | null;
  imageUrl: string | null;
}

const UserProfile = () => {
  const nav = useNavigate();

  //need to create endpoint to take userData
  const [user, setUser] = useState<GetUserProfile | null>(null);

  const [trc, setTrc] = useState<string | null | undefined>(undefined);
  const [erc, setErc] = useState<string | null | undefined>(undefined);
  const [pstrx, setPstrx] = useState<string | null | undefined>(undefined);
  const [email, setEmail] = useState<string | null | undefined>(undefined);

  const CloseHandle = () => {
    nav("/menu");
  };
  return (
    <div className={`${style.userProfile} section`}>
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
        name={user?.firstName ?? "Пользователь"}
        isLive={false}
      ></StreamerPreview>
      <div
        className={style.userProfile__headerLabel}
        style={{ marginTop: "24px" }}
      >
        Платежная информация
      </div>
      <form action="" className={style.userProfile__form}>
        <FormInput
          borderString={{
            borderTopLeftRadius: "14px",
            borderTopRightRadius: "14px",
          }}
          placeholder="Tether TRC20"
          withLine
          value={trc || undefined}
          onChange={(e) => setTrc(e.currentTarget.value)}
        ></FormInput>
        <FormInput
          placeholder="Tether ERC20"
          withLine
          value={erc || undefined}
          onChange={(e) => setErc(e.currentTarget.value)}
        ></FormInput>
        <FormInput
          borderString={{
            borderBottomLeftRadius: "14px",
            borderBottomRightRadius: "14px",
          }}
          placeholder="Piastrix"
          value={pstrx || undefined}
          onChange={(e) => setPstrx(e.currentTarget.value)}
        ></FormInput>
      </form>
      <p className={style.detailsText} style={{ marginTop: "8px" }}>
        На эти реквизиты будет отправлен приз, если вы выиграете в
        соответствующем розыгрыше. Эта информация будет доступна стримеру, на
        которого вы подписаны.
      </p>
      <div
        className={style.userProfile__headerLabel}
        style={{ marginTop: "24px" }}
      >
        Контактные данные
      </div>
      <form action="" className={style.userProfile__form}>
        <FormInput
          borderString={{ borderRadius: "14px" }}
          placeholder="Email"
          value={email || undefined}
          onChange={(e) => setEmail(e.currentTarget.value)}
        ></FormInput>
      </form>
    </div>
  );
};

export default UserProfile;
