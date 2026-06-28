type PriceCardProps = {
  systemPrice: number;
  tokyoPrice: number;
  kansaiPrice: number;
  kyushuPrice: number;
};

function getPriceColor(price: number) {
  if (price >= 20) return "#ff6b6b";
  if (price >= 15) return "#ffd43b";
  if (price <= 8) return "#69db7c";
  return "#ffffff";
}

function PriceCard({
  systemPrice,
  tokyoPrice,
  kansaiPrice,
  kyushuPrice,
}: PriceCardProps) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
        width: "320px",
        background:
          systemPrice >= 20
            ? "linear-gradient(135deg, #3b0d0d, #111827)"
            : systemPrice <= 8
            ? "linear-gradient(135deg, #0d2b18, #111827)"
            : "#111318",
      }}
    >
      <h2>JEPX スポット価格</h2>
      <p>システムプライス</p>

      <h1 style={{ fontSize: "42px", color: getPriceColor(systemPrice) }}>
        {systemPrice.toFixed(2)} 円/kWh
      </h1>

      <p>東京：{tokyoPrice.toFixed(2)} 円</p>
      <p>関西：{kansaiPrice.toFixed(2)} 円</p>
      <p>九州：{kyushuPrice.toFixed(2)} 円</p>
    </div>
  );
}

export default PriceCard;