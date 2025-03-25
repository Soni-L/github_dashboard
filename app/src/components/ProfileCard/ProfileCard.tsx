import React from "react";

interface ProfileCardProps {
  userData: {
    avatar_url: string;
    name: string;
    login: string;
    email: string;
    location: string;
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({ userData }) => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        border: "1px solid",
        borderRadius: "8px",
        gap: "8px",
        width: "fit-content",
        position: "relative",
        paddingTop: "28px",
        flex: "1 1 220px",
        maxWidth: "220px",
      }}
    >
      <h4
        style={{
          top: 0,
          position: "absolute",
          margin: "0",
          whiteSpace: "nowrap",
          left: "50%",
          transform: "translate(-50%, 0)",
          color: "gold",
        }}
      >
        Github user data
      </h4>
      <img
        src={userData?.avatar_url || ""}
        style={{ height: "200px", width: "200px" }}
        alt="User Avatar"
      />
      <p style={{ margin: "0" }}>
        <strong>Name:</strong> {userData?.name}
      </p>
      <p style={{ margin: "0" }}>
        <strong>Username:</strong> {userData?.login}
      </p>
      <p style={{ margin: "0" }}>
        <strong>Email:</strong> {userData?.email}
      </p>
      <p style={{ margin: "0" }}>
        <strong>Location:</strong> {userData?.location}
      </p>
    </section>
  );
};

export default ProfileCard;
