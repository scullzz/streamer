import { useEffect, useState } from "react";
import { CreatePostFilePicker } from "../create_post_file_picker/CreatePostFilePicker";
import { SectionHeader } from "../section_header/SectionHeader";
import style from "./style.module.css";
import { TextBox } from "../text_box/TextBox";
import { useMemoryState } from "../../functions/useMemoryState";
import { FilePreview } from "../file_preview/FilePreview";

let File: File | null = null;
const Post = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(File);
  const [message, setPostMessage] = useMemoryState<string | undefined>(
    "",
    "postMessage"
  );
  useEffect(() => {
    File = selectedFile;
  }, [selectedFile]);

    // const onPreview = () => {};
  const onPostCreate = () => {};
  return (
    <div className={style.PostBlock}>
      <SectionHeader
        left={<span>Закрыть</span>}
        center={<span>BigStreamerBot</span>}
      />

      <div className={style.PostSectionBlock}>
        <div className={style.PostSection_title}>Написать сообщение</div>
        <CreatePostFilePicker
          value={selectedFile}
          onChange={setSelectedFile}
        ></CreatePostFilePicker>
        <TextBox
          value={message}
          onInput={(e) => setPostMessage(e.currentTarget.value)}
          placeholder="Сообщение"
          style={{ marginTop: "20px" }}
        ></TextBox>
        <span
          className={style.PostSection_description}
          style={{ marginTop: "6px" }}
        >
          Сообщение получат все ваши подписчики, у которых бот включен.
        </span>
        <div className={style.PostSection_ButtonsBlock}>
          {/* <button className={style.button_preview} onClick={onPreview}>
            Предпросмотр
          </button> */}
          <button className={style.button_start} onClick={onPostCreate}>
            Опубликовать
          </button>
        </div>

        {
          <FilePreview
            file={selectedFile}
            style={{ marginTop: "15px" }}
          ></FilePreview>
        }
      </div>
    </div>
  );
};

export default Post;
