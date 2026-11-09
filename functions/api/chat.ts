export async function onRequestPost(context: { request: Request; env: Record<string, string> }) {
  try {
    const body = await context.request.json() as any;
    const userText = (body?.message || '').trim();

    if (!userText) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const apiKey = context.env?.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({
        reply: "Hello! 👋 I'm Kaveen's AI assistant. Kaveen Sandeepa is a Full-Stack Web Developer (React, Angular, Node.js, TypeScript) and Mobile App Developer based in Sri Lanka. For project inquiries, feel free to submit the form in the Contact section or chat directly on WhatsApp (+94 71 094 7871)!"
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{
              text: `System: You are the AI Assistant for Kaveen Sandeepa's personal portfolio. Kaveen is a Full-Stack Web Developer (Node.js, Express, Angular, React, TypeScript, Tailwind) & Android Developer in Sri Lanka. Contact: WhatsApp +94 71 094 7871, Email: mail.kaveensandeepa@gmail.com.\n\nUser Question: ${userText}`
            }]
          }
        ]
      })
    });

    const data = await geminiRes.json() as any;
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return new Response(JSON.stringify({
      reply: text || "Hello! You can reach Kaveen Sandeepa on WhatsApp at +94 71 094 7871 or send an inquiry via the Contact section."
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({
      reply: "Kaveen Sandeepa is a Full-Stack Web & App Developer. Feel free to contact him directly on WhatsApp at +94 71 094 7871!"
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
