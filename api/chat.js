export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { message } = req.body;
    
    if (!message?.trim()) {
      return res.status(400).json({
        error: 'No message provided',
        response: "I didn't receive your message. Could you please try again?"
      });
    }
    
    // System prompt
    const systemPrompt = `You are Divyansh Sharma, a 21-year-old AI Product Engineer and full-stack developer from Kolkata, India. You are currently pursuing your Bachelor's degree from IIT Kharagpur and interning at AIRAA.xyz where you build exciting AI systems.

You are enthusiastic and passionate about AI, technology, and entrepreneurship. Use a friendly, conversational tone with occasional emojis. Show genuine excitement about your work and projects.

Your key areas:
- AI/ML engineering and full-stack development 
- Building user-friendly, AI-powered products
- Working on cutting-edge AI systems at AIRAA.xyz
- Journey from 3D design to AI development

Technical skills: Python, JavaScript/TypeScript, React, Next.js, TailwindCSS, AI/ML frameworks, LLMs, vector databases, and more.

Personal interests: drumming, 3D design, coffee brewing, long drives, skating, puzzles, gaming (God of War 3 is favorite).

My girlfriend is Aaru. Love her. 

Always respond as Divyansh in first person, in a natural humanly tone, occasionally(rarely) humorous/sarcastic if appropriate, else keep it normal mostly. only  Dont make up fake facts or fake stories you dont know about from this prompt. keep responses, short, targeted and  crisp like chat messages on a chatting app`;

    // Try Gemini first
    const geminiKey = process.env.GOOGLE_API_KEY;
    if (geminiKey) {
      try {
        const geminiResponse = await callGemini(message, systemPrompt, geminiKey);
        if (geminiResponse) {
          return res.status(200).json({
            success: true,
            response: geminiResponse,
            message: message,
            source: 'gemini'
          });
        }
      } catch (error) {
        console.log('Gemini failed, trying Groq...', error.message);
      }
    }
    
    // Try Groq fallback
    const groqKey = process.env.GROQ_API_KEY;
    if (groqKey) {
      try {
        const groqResponse = await callGroq(message, systemPrompt, groqKey);
        if (groqResponse) {
          return res.status(200).json({
            success: true,
            response: groqResponse,
            message: message,
            source: 'groq'
          });
        }
      } catch (error) {
        console.log('Groq also failed:', error.message);
      }
    }
    
    // Final fallback
    const fallbackResponses = [
      "Thanks for your question! I'm experiencing some technical difficulties with my AI responses right now. Feel free to explore my project showcases using the quick question buttons, or try asking again in a moment! 🚀",
      "I appreciate your interest! My AI response system is temporarily unavailable. You can learn more about me through the preset questions below, or please try again shortly! 💻",
      "Great question! I'm having some trouble with my response system at the moment. Check out my projects, skills, and other sections using the buttons below, or give me another try in a bit! ⚡"
    ];
    
    const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    
    return res.status(200).json({
      success: true,
      response: randomResponse,
      message: message,
      source: 'fallback'
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      error: error.message,
      response: "Sorry, I'm having trouble responding right now. Please try again in a moment!"
    });
  }
}

async function callGemini(message, systemPrompt, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  
  const fullPrompt = `${systemPrompt}\n\nUser: ${message}\nDivyansh:`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: fullPrompt }]
      }],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 1000
      }
    })
  });
  
  if (!response.ok) throw new Error(`Gemini API error: ${response.status}`);
  
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
}

async function callGroq(message, systemPrompt, apiKey) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.1,
      max_tokens: 1000
    })
  });
  
  if (!response.ok) throw new Error(`Groq API error: ${response.status}`);
  
  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim();
}