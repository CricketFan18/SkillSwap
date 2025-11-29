import { Route,Routes } from "react-router";
import Layout from "./components/Layout";
import Chats from "./pages/Chats";
import Activity from "./pages/Activity";
import YourInputs from "./pages/YourInputs";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LandingPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="chats" element={<Chats />} />
          <Route path="activity" element={<Activity />} />
          <Route path="inputs" element={<YourInputs />} />
          <Route path="create" element={<CreatePost />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
