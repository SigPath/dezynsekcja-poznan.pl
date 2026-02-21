// Cloudflare Worker: proxy custom form -> Google Forms
// Fill in FORM_ID and entry IDs to match your Google Form fields.
// Deploy: wrangler publish form-proxy.js

const FORM_ID = '1FAIpQLSeSb0pg5hN9zxyixLISVYqs2slBUlShACiszYOqgcaT60EU8w';
// Map our JSON fields to Google Form entry IDs
const FIELD_MAP = {
  name: 'entry.1604605425',
  phone: 'entry.1385428490',
  problem: 'entry.131674857',
  details: 'entry.681572499',
};

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(),
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405, headers: corsHeaders() });
    }

    let data;
    try {
      data = await request.json();
    } catch (err) {
      return new Response('Bad Request: invalid JSON', { status: 400, headers: corsHeaders() });
    }

    const body = new URLSearchParams();
    body.append(FIELD_MAP.name, data.name || '');
    body.append(FIELD_MAP.phone, data.phone || '');
    body.append(FIELD_MAP.problem, data.problem || '');
    body.append(FIELD_MAP.details, data.details || '');

    const targetUrl = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

    const res = await fetch(targetUrl, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    });

    if (!res.ok) {
      return new Response('Upstream error', { status: 502, headers: corsHeaders() });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        ...corsHeaders(),
        'Content-Type': 'application/json',
      },
    });
  },
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}
