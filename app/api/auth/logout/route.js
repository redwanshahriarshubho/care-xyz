export async function POST(req) {
  const res = new Response(JSON.stringify({ message: 'Logged out' }), { status: 200 })
  res.headers.set('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0')
  return res
}
