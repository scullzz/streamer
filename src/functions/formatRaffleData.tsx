export function formatRaffleDate(dateString: string): string {
  const date = new Date(dateString);

  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day < 10 ? "0" + day : day}:${
    month < 10 ? "0" + month : month
  }:${year}  ${hours}:${minutes}`;
}
