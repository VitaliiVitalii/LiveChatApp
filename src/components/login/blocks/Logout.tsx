const Logout = () => {
  const logout = () => {
    localStorage.clear();
    window.location.href = '/login'
  }

  return (
    
    <div>
      <button onClick={logout}>
        LOGOUT
      </button>
    </div>
    )
}

export default Logout