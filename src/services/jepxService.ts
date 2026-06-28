export async function fetchJepxPrice() {
  const response = await fetch(
    "http://localhost:3002/jepx/latest"
  );

  if (!response.ok) {
    throw new Error("API通信失敗");
  }

  return await response.json();
}