const N8N_WEBHOOK = 'https://tiagoteixeira.app.n8n.cloud/webhook/mcp-lead-site';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Método não permitido.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const nome = String(body.nome || '').trim().slice(0, 120);
    const email = String(body.email || '').trim().toLowerCase().slice(0, 180);
    const concurso = String(body.concurso || '').trim().slice(0, 180);
    const consentimento = body.consentimento === true;

    if (!nome || !email || !concurso) {
      return res.status(400).json({ ok: false, error: 'Preencha nome, e-mail e concurso.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: 'Informe um e-mail válido.' });
    }
    if (!consentimento) {
      return res.status(400).json({ ok: false, error: 'É necessário autorizar o envio do material por e-mail.' });
    }

    const payload = {
      nome,
      email,
      concurso,
      consentimento: true,
      origem: 'site-mcp',
      pagina: String(body.pagina || '').slice(0, 300),
      recebidoEm: new Date().toISOString()
    };

    const response = await fetch(N8N_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const txt = await response.text().catch(() => '');
      console.error('n8n webhook error', response.status, txt);
      return res.status(502).json({ ok: false, error: 'Não foi possível registrar sua solicitação agora.' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('lead endpoint error', error);
    return res.status(500).json({ ok: false, error: 'Erro interno ao processar a solicitação.' });
  }
}
