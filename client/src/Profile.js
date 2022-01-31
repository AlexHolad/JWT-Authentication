import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("data");
    navigate("/");
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("data"));
    setUser(currentUser);
  }, []);
  return (
    <div>
      {user ? (
        <>
          <div>{user.username}</div>
          <div>{user.email}</div>
          <button onClick={logOut} className="btn btn-primary">
            Logout
          </button>
        </>
      ) : (
        <h2>You are not logged in</h2>
      )}
    </div>
  );
};
export default Profile;
