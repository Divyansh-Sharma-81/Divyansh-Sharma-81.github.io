# AI Backend API Setup

This project includes a Node.js backend API that powers the AI responses in the chat modal using Gemini and Groq models.

## Architecture Overview

- **Primary Model**: Google Gemini 2.5 Flash Lite (via Google Generative AI)
- **Fallback Model**: Groq (Llama 3.1 8B Instant) via Groq API
- **Backend**: Node.js serverless function on Vercel
- **Rate Limiting**: Automatic fallback when primary model hits rate limits

## Setup Instructions

### 1. Get API Keys

**Google Gemini API Key:**
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Copy the key for environment variables

**Groq API Key:**
1. Go to [Groq Console](https://console.groq.com/keys)
2. Create an account and generate an API key
3. Copy the key for environment variables

### 2. Local Development Setup

```bash
# Copy environment variables
cp .env.example .env.local

# Add your API keys to .env.local
GOOGLE_API_KEY=your_actual_google_api_key
GROQ_API_KEY=your_actual_groq_api_key

# Run development server
vercel dev
```

### 3. Vercel Deployment

**Environment Variables in Vercel:**
1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add the following variables:
   - `GOOGLE_API_KEY`: Your Google Gemini API key
   - `GROQ_API_KEY`: Your Groq API key

**Deploy:**
```bash
# Deploy to Vercel
vercel --prod
```

## How It Works

### API Flow
1. User types a message in the chat modal
2. Frontend sends POST request to `/api/chat` with the message
3. Python backend receives request and processes it
4. System tries Gemini first, falls back to Groq if rate limited
5. AI response is returned to frontend and displayed

### Rate Limiting Logic
- **Gemini Rate Limit**: 60-second cooldown when rate limited
- **Groq Fallback**: Automatic fallback when Gemini is unavailable
- **Final Fallback**: Predefined friendly messages if both APIs fail

### Preset vs Typed Questions
- **Preset Questions** (Me, Projects, Skills, Fun, Contact): Show custom UI showcases
- **Typed Questions**: Get AI-powered responses from the backend

## System Prompt

The AI persona is configured to respond as Divyansh with:
- Technical expertise in AI/ML, full-stack development
- Personal background (IIT Kharagpur, AIRAA.xyz internship)
- Interests and hobbies (drumming, 3D design, coffee, etc.)
- Professional experience and projects
- Enthusiastic and helpful personality

## Troubleshooting

**API Not Responding:**
- Check environment variables are set correctly
- Verify API keys are valid and have quota remaining
- Check Vercel function logs for errors

**Rate Limiting Issues:**
- Gemini has generous free tier limits
- Groq provides reliable fallback
- Monitor usage in respective dashboards

**CORS Issues:**
- CORS headers are configured in the Python function
- Ensure frontend is making requests to the correct domain

## Files Structure

```
api/
└── chat.js              # Node.js API endpoint with AI integration

vercel.json              # Vercel configuration
.env.example            # Environment variables template
```

## Testing

Test the API locally or after deployment:

```bash
# Test API endpoint
curl -X POST https://your-domain.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Tell me about your projects"}'
```

The chat modal will automatically use the API when deployed to production!