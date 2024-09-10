import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDisableBounces } from "./functions/useDisableBounces";
import { Toaster } from "react-hot-toast";
import { WithMenu } from "./components/withMenu/WithMenu";
// import Subscribe from "./components/(un)subscribe/Subscribe";
import LiveStreamers from "./components/live_streamers/LiveStreamers";
import MainPage from "./components/main_page/MainPage";
import UserProfile from "./components/user_profile/UserProfile";
import StreamerProfile from "./components/streamer_profile/StreamerProfile";
import Post from "./components/create_post/Post";
import StreamerExtraInfo from "./components/streamer_extra_info/StreamerExtraInfo";
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
            <Route
              path="/streamer"
              element={<StreamerProfile></StreamerProfile>}
            ></Route>
            <Route path="/create-post" element={<Post></Post>}></Route>
            <Route
              path="/streamer-extra-info"
              element={<StreamerExtraInfo />}
            ></Route>
          </Routes>
        </WithMenu>
      </Router>
    </>
  );
}

export default App;
