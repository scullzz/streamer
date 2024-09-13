import { useEffect, useState } from "react";
import { CreatePostFilePicker } from "../create_post_file_picker/CreatePostFilePicker";
import { SectionHeader } from "../section_header/SectionHeader";
import style from "./style.module.css";
import { TextBox } from "../text_box/TextBox";
import { useMemoryState } from "../../functions/useMemoryState";
import { FilePreview } from "../file_preview/FilePreview";
import { useNavigate, useParams } from "react-router-dom";

let File: File | null = null;
const Post = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const [selectedFile, setSelectedFile] = useState<File | null>(File);
  const [message, setPostMessage] = useMemoryState<string | undefined>(
    "",
    "postMessage"
  );
  useEffect(() => {
    File = selectedFile;
  }, [selectedFile]);

  const onPreview = () => {
    nav("/post-preview", {
      state: { file: selectedFile, id: id, text: message },
    });
  };

  const backPage = () => {
    nav(`/streamer-extra-info/${id}`);
  };
  const onPostCreate = async () => {
    try {
      if (!id) {
        console.error("Streamer ID is missing");
        return;
      }
      if (!selectedFile) {
        console.error("No file selected");
        return;
      }

      const messageText = message || "";

      const formData = new FormData();
      formData.append("streamer", id);
      formData.append("photo", selectedFile, selectedFile.name);
      formData.append("text", messageText);

      const response = await fetch(`https://api.bigstreamerbot.io/mailings/`, {
        method: "POST",
        headers: {
          Auth: "M1bCSx92W6",
        },
        body: formData,
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className={style.PostBlock}>
      <SectionHeader
        left={<span onClick={() => backPage()}>Закрыть</span>}
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
          <button className={style.button_preview} onClick={onPreview}>
            Предпросмотр
          </button>
          <button className={style.button_start} onClick={onPostCreate}>
            Опубликовать
          </button>
        </div>

        <FilePreview
          file={selectedFile}
          style={{ marginTop: "15px" }}
        ></FilePreview>
      </div>
    </div>
  );
};

export default Post;
