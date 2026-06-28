type AreaPrice = {
  name: string;
  price: number;
};

type AreaPriceTableProps = {
  areaPrices: AreaPrice[];
};

function getBackgroundColor(price: number) {
  if (price >= 20) return "#3b0d0d";
  if (price >= 15) return "#3b230d";
  if (price <= 5) return "#0d2b18";
  if (price <= 10) return "#102a43";
  return "#1f2937";
}

function AreaPriceTable({ areaPrices }: AreaPriceTableProps) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
        marginTop: "20px",
        color: "#ffffff",
      }}
    >
      <h2 style={{ color: "#ffffff" }}>🗾 エリア別価格</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
          gap: "12px",
        }}
      >
        {areaPrices.map((area) => (
          <div
            key={area.name}
            style={{
              backgroundColor: getBackgroundColor(area.price),
              border: "1px solid rgba(255,255,255,0.45)",
              borderRadius: "10px",
              padding: "14px",
              textAlign: "center",
              color: "#ffffff",
            }}
          >
            <div style={{ fontSize: "16px", marginBottom: "6px", color: "#ffffff" }}>
              {area.name}
            </div>
            <strong style={{ fontSize: "22px", color: "#ffffff" }}>
              {area.price.toFixed(2)}
            </strong>
            <div style={{ fontSize: "12px", color: "#ffffff" }}>円/kWh</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AreaPriceTable;