import React from "react";
import { Container } from "reactstrap";

const Profile = () => {
  return (
    <Container>
      <h2>User Profile</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> </p>
        <p><strong>Email:</strong> </p>
        <p><strong>Phone:</strong> </p>
      </div>
    </Container>
  );
};

export default Profile;
