import { useEffect } from "react";
import { tg } from "../App";
import { useNavigate } from "react-router-dom";

const useApplyTelegramTheme = () => {
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const onClick = () => navigate(-1);
      tg.BackButton.onClick(onClick).show();
      tg.expand();
      tg.disableVerticalSwipes();
      tg.enableClosingConfirmation();
      tg.setHeaderColor("#131313");
      tg.setBackgroundColor("#131313");
    } catch (error) {
      console.log(error);
    }
  }, []);
};

export default useApplyTelegramTheme;
