import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDisableBounces } from "./functions/useDisableBounces";
import { Toaster } from "react-hot-toast";
import { WithMenu } from "./components/withMenu/WithMenu";
// import Subscribe from "./components/(un)subscribe/Subscribe";
// import Gs_Widget from "./components/widget_gs/Gs_Widget";
import LiveStreamers from "./components/live_streamers/LiveStreamers";
import MainPage from "./components/main_page/MainPage";
import UserProfile from "./components/user_profile/UserProfile";
export const tg = Telegram.WebApp;
function App() {
  useDisableBounces("parker");
  return (
    <>
      <Toaster />
      <Router>
        <WithMenu>
          <Routes>
            <Route path="/" element={<LiveStreamers></LiveStreamers>}></Route>
            <Route path="/menu" element={<MainPage></MainPage>}></Route>
            <Route path="/me" element={<UserProfile></UserProfile>}></Route>
          </Routes>
        </WithMenu>
      </Router>
    </>
  );
}

export default App;
