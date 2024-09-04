import style from "./style.module.css";
export const NotAvailable = ({
  available,
  text,
}: {
  available: boolean;
  text: string;
}) => {
  return (
    <>
      {!available && (
        <span
          className={style.details_text}
          style={{ textAlign: "center", margin: "5px" }}
        >
          {text}
        </span>
      )}
    </>
  );
};
