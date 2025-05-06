import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar.jsx';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [remainingCredits, setRemainingCredits] = useState(null);
  const [error, setError] = useState(null);

  const generateImage = async () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt!');
      return;
    }

    setLoading(true);
    setError(null);
    setImage(null);

    try {
      const formData = new FormData();
      formData.append('prompt', prompt);

      const response = await axios.post(
        'https://clipdrop-api.co/text-to-image/v1',
        formData,
        {
          headers: {
            'x-api-key': process.env.REACT_APP_CLIPDROP_API_KEY,
          },
          responseType: 'blob',
        }
      );

      const remaining = response.headers['x-remaining-credits'];
      setRemainingCredits(remaining);

      const imageURL = URL.createObjectURL(response.data);
      setImage(imageURL);

      toast.success('Image generated successfully!'); // Success toast
    } catch (err) {
      if (err.response && err.response.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          setError(`Error ${err.response.status}: ${reader.result}`);
        };
        reader.readAsText(err.response.data);
      } else {
        setError('Something went wrong.');
      }
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.heading}>Image Genie</h1>

        <textarea
          style={styles.textarea}
          placeholder="Describe the image you want..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button style={styles.button} onClick={generateImage} disabled={loading}>
          {loading ? '⏳ Generating...' : 'Generate Image'}
        </button>

        {remainingCredits !== null && (
          <p style={styles.credits}>Remaining Credits: {remainingCredits}</p>
        )}

        {error && <p style={styles.error}>{error}</p>}

        {image && (
          <div style={styles.imageContainer}>
            <img src={image} alt="Generated" style={styles.image} />
            <a href={image} download="generated_image.png" style={styles.downloadButton}>
              Download Image
            </a>
          </div>
        )}
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '30px',
    fontFamily: 'Poppins, sans-serif',
    background: '#f5f5f5',
    borderRadius: '12px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    color: '#333',
  },
  heading: {
    fontSize: '2.2rem',
    marginBottom: '20px',
    fontWeight: '600',
    color: '#333',
  },
  textarea: {
    width: '100%',
    height: '120px',
    padding: '15px',
    fontSize: '1.1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    marginBottom: '20px',
    resize: 'none',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  button: {
    padding: '14px 30px',
    fontSize: '1.1rem',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  credits: {
    marginTop: '1rem',
    fontSize: '1rem',
    color: '#555',
  },
  error: {
    marginTop: '1rem',
    color: '#e74c3c',
    fontSize: '1.1rem',
  },
  imageContainer: {
    marginTop: '2rem',
  },
  image: {
    width: '100%',
    maxWidth: '500px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  downloadButton: {
    display: 'inline-block',
    marginTop: '1rem',
    padding: '12px 24px',
    backgroundColor: '#28a745',
    color: '#fff',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '1.1rem',
  },
};

export default ImageGenerator;
