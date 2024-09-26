import { useEffect, useState } from "react";
import { SectionHeader } from "../section_header/SectionHeader";
import style from "./style.module.css";
import { StreamerPreview } from "../streamer_preview/StreamerPreview";
import { FormInput } from "../form_input/FormInput";
import { useNavigate } from "react-router-dom";
import { tg } from "../../App";
interface GetUserProfile {
  id: number;
  tgid: string;
  email: string | null;
  first_name: string;
  last_name: string | null;
  image: string | null;
}

const UserProfile = () => {
  const nav = useNavigate();

  const [user, setUser] = useState<GetUserProfile | null>(null);

  const [trc, setTrc] = useState<string | null | undefined>(undefined);
  const [erc, setErc] = useState<string | null | undefined>(undefined);
  const [pstrx, setPstrx] = useState<string | null | undefined>(undefined);
  const [email, setEmail] = useState<string>("");

  const CloseHandle = () => {
    nav("/menu");
  };

  const getUser = async () => {
    try {
      const response = await fetch("https://api.bigstreamerbot.io/users/1/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Auth: tg.initData,
          "Telegram-User-ID":
            tg.initDataUnsafe.user?.id !== undefined
              ? tg.initDataUnsafe.user.id.toString()
              : "error",
        },
      });
      console.log(email);

      const res = await response.json();
      console.log(res);
      setUser(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
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
        url={`https://t.me/${tg.initDataUnsafe.user?.photo_url}`}
        name={`${user?.first_name ? user.first_name : ""} ${
          user?.last_name ? user.last_name : ""
        }`}
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
          value={user?.email || ""}
          onChange={(e) => setEmail(e.currentTarget.value)}
        ></FormInput>
      </form>
    </div>
  );
};

export default UserProfile;
