export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const fileId = String(req.query.fileId || '').trim();
  if (!/^[A-Za-z0-9_-]{10,200}$/.test(fileId)) {
    return res.status(400).json({ error: 'Invalid fileId' });
  }

  const sourceUrl = 'https://drive.google.com/uc?export=download&id=' + encodeURIComponent(fileId);

  try {
    const upstream = await fetch(sourceUrl, {
      method: req.method === 'HEAD' ? 'HEAD' : 'GET',
      redirect: 'follow',
      headers: {
        'User-Agent': 'MCP-Instagram-Media-Proxy/1.0'
      }
    });

    if (!upstream.ok) {
      return res.status(upstream.status).json({
        error: 'Could not fetch media from Google Drive',
        status: upstream.status
      });
    }

    const contentType = upstream.headers.get('content-type') || 'application/octet-stream';
    if (!contentType.startsWith('image/')) {
      return res.status(415).json({
        error: 'Drive file is not being served as a public image. Share it as Anyone with the link first.',
        contentType
      });
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    if (req.method === 'HEAD') return res.status(200).end();

    const body = Buffer.from(await upstream.arrayBuffer());
    res.setHeader('Content-Length', String(body.length));
    return res.status(200).send(body);
  } catch (error) {
    return res.status(502).json({
      error: 'Media proxy failed',
      message: error && error.message ? error.message : 'Unknown error'
    });
  }
}
