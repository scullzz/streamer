import style from "./style.module.css";

const PostPreview = () => {
  return (
    <div className={style.post_preview}>
      <p className={style.post_preview_title}>Написать сообщение</p>
      <div className={style.post_preview_image_block}>
        <span className={style.post_preview_image_description}>
          Допустимый формат изображения: jpg, png, gif, webp. Максимальный
          размер 500 Kb.
        </span>
      </div>
      <div className={style.post_preview_text_block}>
        <p className={style.post_preview_text}>
          Каждый ПОНЕДЕЛЬНИК доступен CASHBACK на все 3 проекта. До 17% Crypto
          Boss и Unlim и до 20% за последний уровень в AUF AUF -
          https://cobrik.info/auf CRYPTOBOSS - https://cobrik.info/boss UNLIM -
          https://cobrik.info/unlim
        </p>
      </div>
      <span className={style.last_description}>
        Сообщение получат все ваши подписчики.
      </span>
      <button className={style.send_button}>Отправить</button>
    </div>
  );
};

export default PostPreview;
