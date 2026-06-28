type AreaPrice = {
  name: string;
  price: number;
};

type AreaPriceTableProps = {
  areaPrices: AreaPrice[];
};

function getBackgroundColor(price: number) {
  if (price >= 20) return "linear-gradient(135deg, #4b0f0f, #111827)";
  if (price >= 15) return "linear-gradient(135deg, #4a2a0c, #111827)";
  if (price <= 5) return "linear-gradient(135deg, #0d2b18, #111827)";
  if (price <= 10) return "linear-gradient(135deg, #0d2b45, #111827)";
  return "linear-gradient(135deg, #1f2937, #111827)";
}

function AreaPriceTable({ areaPrices }: AreaPriceTableProps) {
  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.45)",
        borderRadius: "12px",
        padding: "18px",
        marginTop: "20px",
        color: "#ffffff",
        background: "rgba(255,255,255,0.03)",
      }}
    >
      <h2 style={{ textAlign: "left", marginTop: 0 }}>
        🗾 エリア別価格
      </h2>

      <div className="area-price-grid">
        {areaPrices.map((area) => (
          <div
            key={area.name}
            style={{
              background: getBackgroundColor(area.price),
              border: "1px solid rgba(255,255,255,0.4)",
              borderRadius: "8px",
              padding: "12px 8px",
              textAlign: "center",
              color: "#ffffff",
              minHeight: "86px",
            }}
          >
            <div style={{ fontSize: "15px", fontWeight: 700 }}>
              {area.name}
            </div>

            <strong
              style={{
                display: "block",
                fontSize: "24px",
                lineHeight: 1.1,
                marginTop: "4px",
              }}
            >
              {area.price.toFixed(2)}
            </strong>

            <div style={{ fontSize: "12px", fontWeight: 700 }}>
              円/kWh
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AreaPriceTable;