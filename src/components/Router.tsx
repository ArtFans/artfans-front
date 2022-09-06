import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Community from './Pages/Community';
import Explore from './Pages/Explore';
import Messages from './Pages/Messages';
import Art from './Pages/Art';
import Settings, { SettingsProfile } from './Pages/Settings';

import CommentsProvider from '../providers/CommentsProvider';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index={true} element={<Home />} />
        <Route path="profile" element={<Profile />}>
          <Route path=":id" element={<Profile />} />
        </Route>
        <Route path="art" element={<CommentsProvider />}>
          <Route path=":id" element={<Art />} />
        </Route>
        <Route path="settings" element={<Settings />}>
          <Route path="profile" element={<SettingsProfile />} />
        </Route>
        <Route path="community" element={<Community />} />
        <Route path="explore" element={<Explore />} />
        <Route path="messages" element={<Messages />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
