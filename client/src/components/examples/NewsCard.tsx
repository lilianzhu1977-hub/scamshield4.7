import NewsCard from "../NewsCard";

export default function NewsCardExample() {
  return (
    <div className="p-6 max-w-2xl">
      <NewsCard
        title="New Investment Scam Targets Elderly"
        summary="Police warn of increasing cases where scammers promise high returns on cryptocurrency investments"
        date="Nov 7, 2025"
        severity="high"
      />
    </div>
  );
}
