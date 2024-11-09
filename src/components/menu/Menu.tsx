import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
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

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: any) => {
    navigate(path);
    if (path === "/play") {
      window.location.href = "https://clash-of-slots.unmake.space/";
    }
  };

  return (
    <BottomNavigation
      showLabels
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: "#1C1C1C",
        zIndex: 1000,
      }}
      value={location.pathname}
    >
      <BottomNavigationAction
        sx={
          location.pathname === "/menu"
            ? { color: "white" }
            : { color: "#B3B3B3" }
        }
        label="Меню"
        icon={
          <img
            src={location.pathname === "/menu" ? menu_active : menu}
            alt="menu"
          />
        }
        onClick={() =>
          handleNavigation(location.pathname === "/menu" ? "/" : "/menu")
        }
      />
      <BottomNavigationAction
        sx={
          location.pathname === "/energy"
            ? { color: "white" }
            : { color: "#B3B3B3" }
        }
        label="Заработать"
        icon={
          <img
            src={location.pathname === "/energy" ? active_energy : energy}
            alt="energy"
          />
        }
        onClick={() => handleNavigation("/energy")}
      />
      <BottomNavigationAction
        sx={
          location.pathname === "/play"
            ? { color: "white" }
            : { color: "#B3B3B3" }
        }
        label="Играть"
        icon={
          <img
            src={location.pathname === "/play" ? play_active : play}
            alt="play"
          />
        }
        onClick={() => handleNavigation("/play")}
      />
      <BottomNavigationAction
        sx={
          location.pathname === "/tournament"
            ? { color: "white" }
            : { color: "#B3B3B3" }
        }
        label="Турниры"
        icon={
          <img
            src={location.pathname === "/tournament" ? active_champ : champ}
            alt="tournament"
          />
        }
        onClick={() => handleNavigation("/tournament")}
      />
      <BottomNavigationAction
        sx={
          location.pathname === "/friends"
            ? { color: "white" }
            : { color: "#B3B3B3" }
        }
        label="Друзья"
        icon={
          <img
            src={location.pathname === "/friends" ? friends_active : friends}
            alt="friends"
          />
        }
        onClick={() => handleNavigation("/friends")}
      />
    </BottomNavigation>
  );
};

export default Menu;
// asdfasf