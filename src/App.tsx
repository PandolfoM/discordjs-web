import { ReactNode, useContext } from "react";
import { AuthContext, IUserDoc } from "./auth/context";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Servers from "./pages/Servers";
import NoPage from "./pages/NoPage";
import { ServerSettings } from "./pages/Dashboard";

type Props = {
  user: IUserDoc | undefined;
  children: React.PropsWithChildren<ReactNode>;
};

const ProtectedRoute = ({ user, children }: Props) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/servers"
            element={
              <ProtectedRoute user={currentUser}>
                <Servers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/:id/serversettings"
            element={<ServerSettings />}
          />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
