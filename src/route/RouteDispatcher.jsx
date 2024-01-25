import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuthState } from "../utilities/firebaseUtils";
import SplashScreen from "../components/SplashScreen/SplashScreen";
import Map from "../components/Map/Map";
import UserProfile from "../components/UserProfile/UserProfile";
import ProtectedRoute from "./ProtectedRoute";

const RouteDispatcher = () => {
  const [user] = useAuthState();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(user != null);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isUserLoggedIn ? (
              <Navigate replace to="/map" />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={<SplashScreen setIsUserLoggedIn={setIsUserLoggedIn} />}
        />
        <Route
          path="/map"
          element={
            <ProtectedRoute
              isUserLoggedIn={isUserLoggedIn}
              component={Map}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              isUserLoggedIn={isUserLoggedIn}
              setIsUserLoggedIn={setIsUserLoggedIn}
              user = {user}
              component={UserProfile}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteDispatcher;
