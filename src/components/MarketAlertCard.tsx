type MarketAlertCardProps = {
  systemPriceData: number[];
  tokyoPriceData: number[];
  kansaiPriceData: number[];
  kyushuPriceData: number[];
};

function MarketAlertCard({
  systemPriceData,
  tokyoPriceData,
  kansaiPriceData,
  kyushuPriceData,
}: MarketAlertCardProps) {
  const maxSystemPrice = Math.max(...systemPriceData);
  const minKyushuPrice = Math.min(...kyushuPriceData);
  const maxTokyoKansaiSpread = Math.max(
    ...tokyoPriceData.map((tokyo, index) => tokyo - kansaiPriceData[index])
  );

  let icon = "🟢";
  let title = "通常";
  let alert = "本日の市場は大きな異常はありません。";
  let backgroundColor = "#0d2b18";

  if (maxSystemPrice >= 20) {
    icon = "🚨";
    title = "価格高騰";
    backgroundColor = "#3b0d0d";
    alert = `システムプライスが最大 ${maxSystemPrice.toFixed(
      2
    )} 円/kWhまで上昇しています。価格高騰に注意してください。`;
  } else if (maxTokyoKansaiSpread >= 5) {
    icon = "🟠";
    title = "エリア値差拡大";
    backgroundColor = "#3b230d";
    alert = `東京と関西の価格差が最大 ${maxTokyoKansaiSpread.toFixed(
      2
    )} 円/kWhまで拡大しています。エリア間値差に注目です。`;
  } else if (minKyushuPrice <= 1) {
    icon = "🟢";
    title = "低価格・再エネ影響";
    backgroundColor = "#0d2b18";
    alert = `九州価格が最低 ${minKyushuPrice.toFixed(
      2
    )} 円/kWhまで低下しています。再エネ大量供給の可能性があります。`;
  }

  return (
    <div
      style={{
        backgroundColor,
        border: "1px solid rgba(255,255,255,0.35)",
        borderRadius: "12px",
        padding: "20px",
        marginTop: "20px",
      }}
    >
      <h2>
        {icon} 市場アラート：{title}
      </h2>
      <p>{alert}</p>
    </div>
  );
}

export default MarketAlertCard;