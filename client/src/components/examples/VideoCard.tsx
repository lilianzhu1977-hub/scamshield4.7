import VideoCard from "../VideoCard";

export default function VideoCardExample() {
  return (
    <div className="p-6 max-w-md">
      <VideoCard
        title="Recognize Phone Scams"
        description="Learn how to identify suspicious phone calls and protect yourself"
        thumbnail="📞"
        onPlay={() => console.log('Play video')}
      />
    </div>
  );
}
