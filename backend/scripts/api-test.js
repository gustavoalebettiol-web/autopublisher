// Simple API test script using global fetch (Node 18+)
require('dotenv').config();

const BASE = `http://localhost:${process.env.PORT || 5000}`;

async function run() {
  try {
    console.log('1) Registering user...');
    let res = await fetch(BASE + '/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'devtest@example.com', password: '123456', nombre: 'Dev Test' })
    });
    console.log(' register status', res.status);
    const dataReg = await res.text();
    console.log(' register body:', dataReg);

    console.log('2) Logging in...');
    res = await fetch(BASE + '/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'devtest@example.com', password: '123456' })
    });
    console.log(' login status', res.status);
    const data = await res.json().catch(()=>null);
    console.log(' login body:', data);
    const token = data?.token;
    if (!token) {
      console.error('No token returned, aborting');
      process.exit(1);
    }

    console.log('3) Creating a post...');
    res = await fetch(BASE + '/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ texto: 'Prueba desde script', fechaProgramada: new Date().toISOString(), redes: ['facebook','telegram'] })
    });
    console.log(' create post status', res.status);
    const postCreated = await res.json().catch(()=>null);
    console.log(' post created:', postCreated);

    console.log('4) Fetching posts...');
    res = await fetch(BASE + '/api/posts', {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    console.log(' get posts status', res.status);
    const posts = await res.json().catch(()=>null);
    console.log(' posts:', posts);

    process.exit(0);
  } catch (err) {
    console.error('Error in api-test:', err);
    process.exit(1);
  }
}

run();
