
import { Route, Routes, Navigate } from 'react-router-dom';
import LayoutSignup from './pages/user/sign-up/LayoutSignup';
import LayoutSignin from './pages/user/sign-in/LayoutSignin';
import LayoutHome from './pages/home/LayoutHome';
import LayoutOverview from './pages/friend-request/LayoutOverview';
import LayoutConversation from './pages/conversation/LayoutConversation';
import NotFound from './pages/notfound/NotFound';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route exact path="/sign-up" element={<LayoutSignup />} />
        <Route exact path="/sign-in" element={<LayoutSignin />} />
        <Route exact path="/chat" element={<LayoutHome />} />
        <Route exact path="/add-friend" element={<LayoutOverview />} />
        <Route exact path="/chat/conversation/:conversationId" element={<LayoutConversation />} />
        <Route path="404" element={<NotFound />} />
        <Route path="/" element={<Navigate to="/sign-in" />} />
        <Route path="/" element={<Navigate to="/sign-up" />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
