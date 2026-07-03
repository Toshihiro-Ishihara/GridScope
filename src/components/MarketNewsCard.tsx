type MarketNews = {
  title: string;
  link: string;
  publishedAt?: string;
  source: string;
};

type MarketNewsCardProps = {
  news: MarketNews[];
};

function MarketNewsCard({ news }: MarketNewsCardProps) {
  return (
    <div className="market-news-card">
      <h2>📰 市場ニュース</h2>

      {news.length === 0 ? (
        <p>関連ニュースは見つかりませんでした。</p>
      ) : (
        <div className="market-news-list">
          {news.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="market-news-item"
            >
              <div className="market-news-title">{item.title}</div>
              <div className="market-news-source">{item.source}</div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default MarketNewsCard;