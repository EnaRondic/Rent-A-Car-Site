import React, { useEffect, useState } from "react";
import { Container, Spinner } from "reactstrap";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      setError("User not authenticated");
      setLoading(false);
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://tim4.cortexakademija.com/api/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch profile data');
        const data = await response.json();
        setUser(data); // Save user data in state
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading) {
    return (
      <Container>
        <div className="loading">
          <Spinner animation="border" role="status" />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="error">
          <h3>Error: {error}</h3>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <h1>User Profile</h1>
      <div className="profile-info">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
      </div>
    </Container>
  );
};

export default Profile;
