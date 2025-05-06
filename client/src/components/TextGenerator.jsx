import React, { useState } from 'react';
import Navbar from './Navbar';

const TextGenerator = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_CHATBOT_API_KEY;

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct',
          messages: [
            { role: 'system', content: 'You are a helpful chatbot.' },
            ...newMessages.map((msg) => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text,
            })),
          ],
        }),
      });

      const data = await response.json();
      const botReply = data.choices?.[0]?.message?.content || 'No response.';
      setMessages([...newMessages, { sender: 'bot', text: botReply }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([
        ...newMessages,
        { sender: 'bot', text: 'Oops! Something went wrong.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          maxWidth: '800px',
          margin: '30px auto',
          padding: '30px',
          background: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        }}
      >
        <h2
          style={{
            fontSize: '28px',
            marginBottom: '20px',
            borderBottom: '2px solid #f0f0f0',
            paddingBottom: '10px',
            color: '#333',
          }}
        >
          ChatFlow
        </h2>

        <div
          style={{
            height: '400px',
            overflowY: 'auto',
            padding: '20px',
            background: '#fdfdfd',
            borderRadius: '12px',
            marginBottom: '20px',
            border: '1px solid #eee',
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                textAlign: msg.sender === 'user' ? 'right' : 'left',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  background: msg.sender === 'user' ? '#2979ff' : '#f1f1f1',
                  color: msg.sender === 'user' ? '#fff' : '#333',
                  padding: '12px 16px',
                  borderRadius: '18px',
                  maxWidth: '70%',
                  fontSize: '15px',
                  wordBreak: 'break-word',
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Type your message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '10px',
              border: '1px solid #ccc',
              fontSize: '16px',
              backgroundColor: '#fff',
              color: '#333',
              minWidth: '60%',  // Ensuring input takes up more space
            }}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            style={{
              padding: '8px 16px',  // Reducing padding to make the button smaller
              background: loading ? '#aaa' : '#2979ff',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              minWidth: '70px',  // Setting a smaller width for the button
            }}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </>
  );
};

export default TextGenerator;
