export default function resJson(data: unknown, statusCode: number) {
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
    status: statusCode,
  });
}
