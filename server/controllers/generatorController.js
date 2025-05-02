const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const generateText = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.CHATBOT_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const botReply = response.data.choices[0]?.message?.content || 'No response.';
    res.json({ message: botReply });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate text' });
  }
};

const generateImage = async (req, res) => {
  const { prompt } = req.body;

  try {
    const formData = new FormData();
    formData.append('prompt', prompt);

    const response = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      formData,
      {
        headers: {
          'x-api-key': process.env.CLIPDROP_API_KEY,
        },
        responseType: 'blob',
      }
    );

    const imageURL = URL.createObjectURL(response.data);
    res.json({ imageURL });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate image' });
  }
};

module.exports = { generateText, generateImage };
