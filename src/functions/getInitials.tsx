import { tg } from "../App";


export interface Initials {
  initials: string;
  color: string;
}

export function getInitials(user: WebAppUser | undefined): Initials {
  if (user === undefined)
    return {
      color: tg.themeParams.button_color || "var(--btn-text-color)",
      initials: "NA",
    };
  const getColor = (initials: string): string => {
    // Простая функция для определения цвета на основе инициалов
    const colors = [
      "#FF6347", // Tomato
      "#FFD700", // Gold
      "#32CD32", // Lime Green
      "#1E90FF", // Dodger Blue
      "#FF69B4", // Hot Pink
      "#FF4500", // Orange Red
      "#00FA9A", // Medium Spring Green
      "#20B2AA", // Light Sea Green
      "#FF1493", // Deep Pink
      "#00BFFF", // Deep Sky Blue
      "#7FFF00", // Chartreuse
      "#FF8C00", // Dark Orange
      "#40E0D0", // Turquoise
      "#7CFC00", // Lawn Green
      "#FF00FF", // Magenta
    ];
    let hash = 0;
    for (let i = 0; i < initials.length; i++) {
      hash = initials.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  let initials = "";
  const firstNameParts = user.first_name.split(" ");

  if (firstNameParts.length > 1) {
    initials = firstNameParts[0][0] + firstNameParts[1][0];
  } else {
    if (user.last_name) {
      initials = user.first_name[0] + user.last_name[0];
    } else {
      initials = user.first_name[0] + user.first_name[0];
    }
  }

  const color = getColor(initials);
  return { initials, color };
}
