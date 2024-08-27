import { GlobalPay } from "global-solutions-widget";
const Gs_Widget = () => {
  const widget = new GlobalPay();
  widget.showWidget();
  return <div></div>;
};

export default Gs_Widget;
