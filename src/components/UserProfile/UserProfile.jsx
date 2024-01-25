import React, { useEffect } from "react";
import "./UserProfile.less";
import ButtomNav from "../ButtomNav/ButtomNav";
import { firebaseSignOut } from "../../utilities/firebaseUtils";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";

const UserProfile = ({ setIsUserLoggedIn, user }) => {
  useEffect(() => {
    if (user !== undefined && user !== null) {
      setIsUserLoggedIn(true);
    }
  }, [user]);

  const handleFirebaseLogout = () => {
    setIsUserLoggedIn(false);
    firebaseSignOut();
  };

  return (
    <div className="background-container">
      <div className="profile-container">
        <div className="user-info">
          <h2>{user.displayName}</h2>

          <div className="top-text">
            <p> {user.email}</p>
          </div>
          <Button
            onClick={handleFirebaseLogout}
            variant="outlined"
            color="error"
            endIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </div>
      </div>
      <ButtomNav />
    </div>
  );
};

export default UserProfile;
