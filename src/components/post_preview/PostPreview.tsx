import style from "./style.module.css";
import { useLocation } from "react-router-dom";
import { FilePreview } from "../file_preview/FilePreview";
import { SectionHeader } from "../section_header/SectionHeader";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { tg } from "../../App";

const PostPreview = () => {
  const location = useLocation();
  const { file, id, text } = location.state;
  const nav = useNavigate();

  useEffect(() => {
    tg.setHeaderColor("#efeff3");
    tg.setBackgroundColor("#efeff3");
  }, []);

  const backPage = () => {
    nav(`/create-post/${id}`);
  };

  return (
    <div className={style.back}>
      <SectionHeader
        left={<span onClick={() => backPage()}>Закрыть</span>}
        center={<span>BigStreamerBot</span>}
      />
      <div className={style.post_preview}>
        <p className={style.post_preview_title}>Написать сообщение</p>
        <div className={style.post_preview_image_block}>
          <FilePreview file={file} />
          <span className={style.post_preview_image_description}>
            Допустимый формат изображения: jpg, png, gif, webp. Максимальный
            размер 500 Kb.
          </span>
        </div>
        <div className={style.post_preview_text_block}>
          <div className={style.miniBlock}>
            <p className={style.text_one}>{text}</p>
          </div>
        </div>
        <span className={style.last_description}>
          Сообщение получат все ваши подписчики.
        </span>
        {/* <button className={style.send_button}>Отправить</button> */}
      </div>
    </div>
  );
};

export default PostPreview;
