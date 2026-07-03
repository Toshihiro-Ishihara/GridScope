export async function fetchJepxPrice() {
  const response = await fetch(
    "https://gridscope-api.onrender.com/jepx/latest"
  );

  if (!response.ok) {
    throw new Error("API通信失敗");
  }

  return await response.json();
}

export async function fetchMarketNews() {
  const response = await fetch(
    "https://gridscope-api.onrender.com/market-news"
  );

  if (!response.ok) {
    throw new Error("ニュース取得失敗");
  }

  return await response.json();
}