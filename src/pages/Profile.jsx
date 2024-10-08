import React, { useEffect, useState } from "react";
import { Container, Spinner } from "reactstrap";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('https://api.example.com/user/profile'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <Container>
        <Spinner color="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <h2>Error: {error}</h2>
      </Container>
    );
  }

  return (
    <Container>
      <h2>User Profile</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>
    </Container>
  );
};

export default Profile;
