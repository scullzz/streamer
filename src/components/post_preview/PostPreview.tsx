import style from "./style.module.css";
import { useLocation } from "react-router-dom";
import { FilePreview } from "../file_preview/FilePreview";
// import { SectionHeader } from "../section_header/SectionHeader";
// import { useNavigate } from "react-router-dom";

const PostPreview = () => {
  // const nav = useNavigate();
  // const backPage = () => {
  //   nav("/create-post");
  // };

  const location = useLocation();
  const { file } = location.state;

  return (
    <div className={style.back}>
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
          <div>
            <p className={style.post_preview_text}>
              Каждый ПОНЕДЕЛЬНИК доступен CASHBACK на все 3 проекта. До 17%
              Crypto Boss и Unlim и до 20% за последний уровень в AUF AUF -
              https://cobrik.info/auf CRYPTOBOSS - https://cobrik.info/boss
              UNLIM - https://cobrik.info/unlim
            </p>
          </div>
          <div className={style.miniBlock}>
            <p className={style.text_one}>AUF - https://cobrik.info/auf</p>
            <p className={style.text_one}>
              CRYPTOBOSS - https://cobrik.info/boss
            </p>
            <p className={style.text_one}>UNLIM - https://cobrik.info/unlim</p>
          </div>
        </div>
        <span className={style.last_description}>
          Сообщение получат все ваши подписчики.
        </span>
        <button className={style.send_button}>Отправить</button>
      </div>
    </div>
  );
};

export default PostPreview;
