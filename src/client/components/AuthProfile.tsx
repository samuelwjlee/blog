import React from "react";
import { createUseStyles } from "react-jss";

import { User } from "client/types/auth.types";

const useStyles = createUseStyles({
  profileContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    borderRadius: "50%",
    height: 55,
    marginRight: 10,
  },
  profileInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
  },
  userName: {
    fontSize: 18,
  },
  email: {
    fontSize: 13,
    fontWeight: "lighter",
  },
});

const AuthProfile: React.FC<User> = ({ profileImageUrl, name, email }) => {
  const classes = useStyles();

  return (
    <div className={classes.profileContainer}>
      <img
        alt="profile"
        className={classes.profileImage}
        src={profileImageUrl || ""}
      />
      <div className={classes.profileInfo}>
        <div className={classes.userName}>{name}</div>
        <div className={classes.email}>{email}</div>
      </div>
    </div>
  );
};

export default AuthProfile;
