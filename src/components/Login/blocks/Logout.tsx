import React from "react";

const Logout = () => {
  const isAuthenticated = localStorage.getItem('token'); 

  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  }

  return (
    <div>
      {isAuthenticated && (
        <button onClick={logout}>
          LOGOUT
        </button>
      )}
    </div>
  );
}

export default Logout;