import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import champ from "./image/bt_champ.svg";
import energy from "./image/bt_energi.svg";
import friends from "./image/bt_friengs.svg";
import menu from "./image/bt_menu.svg";
import play from "./image/bt_play.svg";

import active_champ from "./image/bt_champ_active.svg";
import active_energy from "./image/bt_energi_active.svg";
import friends_active from "./image/bt_friengs_active.svg";
import menu_active from "./image/bt_close_active.svg";
import play_active from "./image/bt_play_active.svg";
import { useLocation } from "react-router-dom";
import MenuItem from "../menuItem/MenuItem";
const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className={style.footer}>
      <div
        className={style.menu}
        style={{
          borderTop: "1px solid #1C1C1C",
          backgroundColor: "#1C1C1C",
        }}
      >
        <MenuItem
          active={location.pathname == "/menu"}
          label="Меню"
          icon={menu}
          onIcon={menu_active}
          onClick={() => {
            location.pathname == "/menu" ? navigate("/") : navigate("/menu");
          }}
        ></MenuItem>
        <MenuItem
          active={location.pathname == "/energy"}
          label="Заработать"
          icon={energy}
          onIcon={active_energy}
          onClick={() => navigate("/energy")}
        ></MenuItem>
        <MenuItem
          active={location.pathname == "/play"}
          label="Играть"
          icon={play}
          onIcon={play_active}
          onClick={() => navigate("/play")}
        ></MenuItem>
        <MenuItem
          active={location.pathname == "/tournament"}
          label="Турниры"
          icon={champ}
          onIcon={active_champ}
          onClick={() => navigate("/tournament")}
        ></MenuItem>
        <MenuItem
          active={location.pathname == "/friends"}
          label="Друзья"
          icon={friends}
          onIcon={friends_active}
          onClick={() => navigate("/friends")}
        ></MenuItem>
      </div>
    </div>
  );
};

export default Menu;
