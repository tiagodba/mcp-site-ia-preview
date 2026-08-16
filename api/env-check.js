export default function handler(req,res){
  const present=(v)=>Boolean(String(v||'').trim());
  return res.status(200).json({
    gemini: present(process.env.GEMINI_API_KEY),
    tavily: present(process.env.TAVILY_API_KEY)||present(process.env.TAVLY_API_KEY),
    groq: present(process.env.GROQ_API_KEY),
    vercelEnv: process.env.VERCEL_ENV || null
  });
}
