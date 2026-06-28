type AiInsightCardProps = {
  systemPrice: number;
  tokyoPrice: number;
  kansaiPrice: number;
  kyushuPrice: number;
};

function AiInsightCard({
  systemPrice,
  tokyoPrice,
  kansaiPrice,
  kyushuPrice,
}: AiInsightCardProps) {
  const tokyoKansaiSpread = tokyoPrice - kansaiPrice;

  let insight = `システムプライスは ${systemPrice.toFixed(
    2
  )} 円/kWhです。本日の市場価格はおおむね安定しています。`;

  if (systemPrice >= 20) {
    insight = `システムプライスは ${systemPrice.toFixed(
      2
    )} 円/kWhと高水準です。需要増加や供給余力の低下に注意が必要です。`;
  } else if (systemPrice <= 8) {
    insight = `システムプライスは ${systemPrice.toFixed(
      2
    )} 円/kWhと低水準です。再エネ供給の増加や需要の弱さが影響している可能性があります。`;
  } else if (tokyoKansaiSpread >= 5) {
    insight = `東京価格は関西価格を ${tokyoKansaiSpread.toFixed(
      2
    )} 円/kWh上回っています。エリア間の需給差や連系線制約に注目です。`;
  } else if (kyushuPrice <= 10) {
    insight = `九州価格は ${kyushuPrice.toFixed(
      2
    )} 円/kWhと低めです。太陽光発電など再エネ供給が価格を押し下げている可能性があります。`;
  }

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
        width: "320px",
      }}
    >
      <h2>🤖 AI Market Insight</h2>
      <p>{insight}</p>
    </div>
  );
}

export default AiInsightCard;