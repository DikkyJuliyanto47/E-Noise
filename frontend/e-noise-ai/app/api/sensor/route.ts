export async function GET() {
  const data = {
    aroma: "Latte",
    confidence: 92,
    mq2: 145,
    mq3: 200,
    mq135: 178,
    timestamp: new Date().toISOString(),
  };

  return Response.json(data);
}
