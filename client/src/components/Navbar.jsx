import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

function Navbar() {
  const navigate = useNavigate();

  const navStyle = {
    padding: '16px 32px',
    backgroundColor: '#2d3748',  // Darker background
    color: '#ffffff',
    display: 'flex',
    justifyContent: 'space-between',  // Space between the header and the right-side links
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
  };

  const linkStyle = {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '16px',
    marginLeft: '20px',  // Space between links
  };

  const buttonStyle = {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    fontSize: '16px',
    cursor: 'pointer',
    marginLeft: '20px',  // Space between button and links
    fontWeight: 'bold',
    padding: '8px 16px',
    borderRadius: '4px',
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data (if stored)
    toast.success('Logged out successfully!'); // Display success toast
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav style={navStyle}>
      <h1 style={{ margin: 0, fontSize: '24px' }}>Promptly</h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/text" style={linkStyle}>Text Generator</Link>
        <Link to="/image" style={linkStyle}>Image Generator</Link>
        <button onClick={handleLogout} style={buttonStyle}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
