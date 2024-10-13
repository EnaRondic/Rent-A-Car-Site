import React, { useEffect, useState } from "react";
import { Container, Spinner } from "reactstrap";
import { useNavigate } from "react-router-dom";
import '../styles/profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("User not authenticated");
      setLoading(false);
      navigate("/login");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://tim4.cortexakademija.com/api/user", {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch profile data');
        const data = await response.json();
        setUser(data);
        setFormData({ name: data.name, email: data.email, phone: data.phone });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    
    try {
      const response = await fetch("http://tim4.cortexakademija.com/api/user", {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update profile');
      const data = await response.json();
      setUser(data);
      setEditing(false);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <Container className="profile-container">
        <div className="profile-loading">
          <Spinner animation="border" role="status" />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="profile-container">
        <div className="profile-error">
          <h3>Error: {error}</h3>
        </div>
      </Container>
    );
  }

  return (
    <Container className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-info">
        <h2>Profile Information</h2>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <button className="edit-button" onClick={handleEditClick}>Edit Profile</button>
      </div>

      {editing && (
        <div className="edit-profile">
          <h2>Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <button type="submit">Save Changes</button>
          </form>
        </div>
      )}
    </Container>
  );
};

export default Profile;
