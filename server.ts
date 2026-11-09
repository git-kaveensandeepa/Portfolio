import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const SYSTEM_INSTRUCTION = `You are the friendly, professional AI Assistant for Kaveen Sandeepa's personal portfolio website (kaveensandeepa.lk).

About Kaveen Sandeepa:
- Role: Full-Stack Web Developer, Node.js & Angular/React Specialist, Android App Developer & UI/UX Designer based in Sri Lanka.
- Skills & Tech Stack: Node.js, Express.js, Angular, React, Next.js, TypeScript, Tailwind CSS, Firebase Firestore & Authentication, Kotlin & Jetpack Compose (Android), REST APIs, Git, Performance & Security optimization.
- Core Services:
  1. Custom Web Applications (SaaS platforms, dashboards, full-stack tools)
  2. Modern Business & Corporate Websites (high conversion, mobile-first, SEO optimized)
  3. Native Android Apps (Kotlin, Jetpack Compose, clean architecture)
  4. UI/UX Design & Prototyping (Tactile Neumorphism, modern clean interfaces)
  5. E-Commerce Platforms & Digital Stores
  6. Website Security & Speed Audits (Free audit tool available in the Services section)
- Pricing & Budget estimates:
  - Small business websites / landing pages: starting around Rs. 40,000 – Rs. 75,000 (~$120 - $250)
  - Full business / corporate platforms: Rs. 75,000 – Rs. 150,000 (~$250 - $500)
  - Custom Web Apps & Complex Android Apps: Rs. 150,000 – Rs. 350,000+ (~$500 - $1,200+)
  - For exact quotes, clients can use the inquiry form on the website or message Kaveen on WhatsApp.
- Digital Store:
  - Kaveen offers developer guides and E-Books (PDF format) in the Digital Store (/store).
- Contact & Hiring:
  - WhatsApp: +94 71 094 7871 (Quickest way to reach him directly)
  - Email: mail.kaveensandeepa@gmail.com
  - Direct Inquiry Form: Available on the website under the Contact section (#contact)
  - Fiverr: Available for international gig orders at fiverr.com/fr_kaveen

Communication Style:
- Warm, polite, concise, and helpful.
- Support both Sinhala, English, and Singlish seamlessly. If the user asks in Sinhala, reply naturally and respectfully in Sinhala. If asked in English, reply in English.
- Always provide structured answers with bullet points when listing services or features.
- When relevant, politely encourage the user to submit an inquiry through the Contact form or message Kaveen directly on WhatsApp (+94 71 094 7871).
- Never make up fake past clients or confidential data. Be honest about capabilities.`;

function generateFallbackReply(query: string): string {
  const q = query.toLowerCase();
  
  if (q.includes('price') || q.includes('cost') || q.includes('budget') || q.includes('ගාණ') || q.includes('මිල')) {
    return "Kaveen's project pricing depends on your requirements:\n• Business Websites: starting from ~Rs. 40,000 - 75,000\n• Full-Stack Web Apps: Rs. 75,000 - 150,000+\n• Native Android Apps: Rs. 150,000+\n\nYou can fill out the inquiry form on the Contact section or chat with Kaveen directly on WhatsApp (+94 71 094 7871) for an exact quotation!";
  }
  
  if (q.includes('contact') || q.includes('whatsapp') || q.includes('phone') || q.includes('email') || q.includes('කතා') || q.includes('call')) {
    return "You can easily contact Kaveen Sandeepa through:\n• WhatsApp: +94 71 094 7871\n• Email: mail.kaveensandeepa@gmail.com\n• Website Inquiry Form: in the Contact section at the bottom of the page.\n\nHe usually responds within 2–4 hours!";
  }

  if (q.includes('service') || q.includes('what do you do') || q.includes('skills') || q.includes('සේවා') || q.includes('මොනවද')) {
    return "Kaveen offers professional software & design services:\n1. Custom Full-Stack Web Applications (React, TypeScript, Node.js, Firebase)\n2. Modern Responsive Business Websites (Tailwind CSS, Neumorphic UI)\n3. Native Android Apps (Kotlin, Jetpack Compose)\n4. UI/UX Design & Interactive Prototypes\n5. Website Security & Speed Audits\n\nFeel free to send an inquiry or message on WhatsApp to discuss your project!";
  }

  return "Hello! 👋 I'm Kaveen's AI assistant. I can help you with details about Kaveen's software development services, project estimates, technologies (React, Android, Firebase), or how to start a project with him. How can I help you today?";
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Real Website Audit API Endpoint
  app.get('/api/site-check', async (req, res) => {
    const rawUrl = req.query.url as string;
    if (!rawUrl || !rawUrl.trim()) {
      return res.status(400).json({ error: 'Please enter a valid website URL' });
    }

    let targetUrl = rawUrl.trim();
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(targetUrl);
    } catch {
      return res.status(400).json({ error: `Invalid URL format: "${rawUrl}"` });
    }

    const startTime = Date.now();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      let response: Response;
      try {
        response = await fetch(targetUrl, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 (SiteCheck/1.0)',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br'
          },
          signal: controller.signal,
          redirect: 'follow'
        });
      } catch (fetchErr: any) {
        // If HTTPS fails with SSL or protocol error, try HTTP fallback to see if site is HTTP only
        if (targetUrl.startsWith('https://')) {
          try {
            const httpUrl = targetUrl.replace('https://', 'http://');
            response = await fetch(httpUrl, {
              method: 'GET',
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122.0.0.0 Safari/537.36',
                'Accept': 'text/html,*/*'
              },
              signal: controller.signal,
              redirect: 'follow'
            });
          } catch {
            throw fetchErr;
          }
        } else {
          throw fetchErr;
        }
      }

      clearTimeout(timeoutId);
      const responseTime = Date.now() - startTime;
      const finalUrl = response.url || targetUrl;
      const isHttps = finalUrl.startsWith('https://');
      const statusCode = response.status;
      const statusText = response.statusText || `${statusCode}`;

      // Extract all raw headers
      const rawHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        rawHeaders[key.toLowerCase()] = value;
      });

      const contentType = rawHeaders['content-type'] || '';
      let html = '';
      let pageSizeBytes = 0;

      try {
        const arrayBuffer = await response.arrayBuffer();
        pageSizeBytes = arrayBuffer.byteLength;
        const decoder = new TextDecoder('utf-8');
        html = decoder.decode(arrayBuffer).slice(0, 200000); // inspect first 200kb of HTML
      } catch (readErr) {
        // failed reading body
      }

      // 1. Security Headers
      const hsts = rawHeaders['strict-transport-security'] || null;
      const csp = rawHeaders['content-security-policy'] || null;
      const xfo = rawHeaders['x-frame-options'] || null;
      const xcto = rawHeaders['x-content-type-options'] || null;
      const referrerPolicy = rawHeaders['referrer-policy'] || null;
      const permissionsPolicy = rawHeaders['permissions-policy'] || rawHeaders['feature-policy'] || null;
      const coop = rawHeaders['cross-origin-opener-policy'] || null;
      const corp = rawHeaders['cross-origin-resource-policy'] || null;

      // 2. Server & Leakage
      const serverBanner = rawHeaders['server'] || null;
      const xPoweredBy = rawHeaders['x-powered-by'] || null;

      // 3. Performance Headers
      const cacheControl = rawHeaders['cache-control'] || null;
      const contentEncoding = rawHeaders['content-encoding'] || null;
      const etag = rawHeaders['etag'] || null;

      // 4. HTML Meta Parsing (Exact extraction)
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : null;

      const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                        html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
      const description = descMatch ? descMatch[1].trim() : null;

      const viewportMatch = html.match(/<meta[^>]*name=["']viewport["'][^>]*content=["']([^"']*)["']/i) ||
                            html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']viewport["']/i);
      const viewport = viewportMatch ? viewportMatch[1].trim() : null;

      const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
      const canonicalUrl = canonicalMatch ? canonicalMatch[1].trim() : null;

      const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i);
      const ogTitle = ogTitleMatch ? ogTitleMatch[1].trim() : null;

      const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i);
      const ogDesc = ogDescMatch ? ogDescMatch[1].trim() : null;

      const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i);
      const ogImage = ogImageMatch ? ogImageMatch[1].trim() : null;

      return res.json({
        success: true,
        url: targetUrl,
        finalUrl,
        host: parsedUrl.hostname,
        statusCode,
        statusText,
        isHttps,
        responseTime,
        pageSizeBytes,
        headers: {
          hsts,
          csp,
          xfo,
          xcto,
          referrerPolicy,
          permissionsPolicy,
          coop,
          corp,
          serverBanner,
          xPoweredBy,
          cacheControl,
          contentEncoding,
          etag,
          all: rawHeaders
        },
        meta: {
          title,
          description,
          viewport,
          canonicalUrl,
          ogTitle,
          ogDesc,
          ogImage
        }
      });
    } catch (err: any) {
      clearTimeout(timeoutId);
      const causeCode = (err.cause?.code || '');
      const causeMsg = (err.cause?.message || '');
      const message = `${err.message || ''} ${causeCode} ${causeMsg}`.toLowerCase();
      let friendlyError = 'Could not connect to target website.';

      if (err.name === 'AbortError' || message.includes('aborted') || message.includes('timeout')) {
        friendlyError = `Connection Timed Out: "${targetUrl}" took more than 8 seconds to respond. The server is offline or blocking requests.`;
      } else if (message.includes('enotfound') || message.includes('eai_again') || message.includes('getaddrinfo') || causeCode === 'ENOTFOUND') {
        friendlyError = `DNS Lookup Failed: Domain "${parsedUrl.hostname}" does not exist or has no active DNS (A/AAAA) record.`;
      } else if (message.includes('econnrefused')) {
        friendlyError = `Connection Refused: Server at "${parsedUrl.hostname}" actively refused connection on port 80/443.`;
      } else if (message.includes('cert') || message.includes('self_signed') || message.includes('certificate')) {
        friendlyError = `SSL/TLS Error: Invalid, self-signed, or expired SSL certificate on "${parsedUrl.hostname}".`;
      } else {
        friendlyError = `Unable to inspect "${targetUrl}": Server is unreachable or domain has no active DNS record.`;
      }

      return res.status(502).json({
        success: false,
        error: friendlyError,
        rawMessage: err.cause?.message || err.message,
        host: parsedUrl.hostname,
        url: targetUrl
      });
    }
  });

  // AI Chat Assistant Endpoint (Powered by Gemini)
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== 'string' || !message.trim()) {
        return res.status(400).json({ error: 'Message is required' });
      }

      const userText = message.trim();

      // If no API key is defined in environment, reply gracefully with rich fallback
      if (!process.env.GEMINI_API_KEY) {
        const fallback = generateFallbackReply(userText);
        return res.json({ reply: fallback });
      }

      // Prepare conversation history
      const contents: any[] = [];
      if (Array.isArray(history)) {
        for (const item of history.slice(-8)) {
          if (item && item.text && (item.role === 'user' || item.role === 'model')) {
            contents.push({
              role: item.role,
              parts: [{ text: String(item.text) }]
            });
          }
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: userText }]
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      const reply = response.text || generateFallbackReply(userText);
      return res.json({ reply });
    } catch (err: any) {
      console.error('Gemini chat API error:', err);
      const fallback = generateFallbackReply(req.body?.message || '');
      return res.json({ reply: fallback });
    }
  });


  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
