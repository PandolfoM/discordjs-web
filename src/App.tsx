import { ReactNode, useContext } from "react";
import { AuthContext, IUserDoc } from "./auth/context";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Servers from "./pages/Servers";
import NoPage from "./pages/NoPage";
import Dashboard from "./pages/Dashboard";

type Props = {
  user: IUserDoc | undefined;
  children: React.PropsWithChildren<ReactNode>;
};

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ user, children }: Props) => {
    if (!user) {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  return (
    <BrowserRouter basename="/">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/servers"
          element={
            <ProtectedRoute user={currentUser}>
              <Servers />
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
