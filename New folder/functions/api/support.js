export async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'POST required' }), { status: 405 });
  }
  try {
    const body = await request.json();
    const question = (body.question || '').trim();
    if (!question) return new Response(JSON.stringify({ error: 'question required' }), { status: 400 });

    // Simple KB lookup (KV)
    // KV binding must be set in your Pages settings: binding name KB
    const kbKey = 'kb:' + question.toLowerCase().slice(0,64);
    let answer = await env.KB.get(kbKey);
    if (answer) {
      return new Response(JSON.stringify({ answer }), { status: 200 });
    }

    // If no KB answer, publish to escalation queue (simulate by writing to KV 'escalation:...' or use Queue)
    // For Pages free tier, use KV write as a fallback for manual review:
    const ticketId = 'ticket:' + Date.now();
    await env.KB.put(ticketId, JSON.stringify({ question, createdAt: Date.now() }));

    // In a full setup we'd publish to a Cloudflare Queue named ESCALATIONS:
    // await env.ESCALATIONS.send(JSON.stringify({ ticketId, question }));

    const fallback = "Thanks — we've created a ticket for a human to review. We'll get back shortly.";
    return new Response(JSON.stringify({ answer: fallback }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
