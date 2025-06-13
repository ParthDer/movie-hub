'use client'
import ReactPlayer from 'react-player';

export default function Trailer({ videos }: { videos: { key: string; type: string; site: string }[] }) {
  const trailer = videos.find((v) => v.type === 'Trailer' && v.site === 'YouTube');

  if (!trailer) return <p className="text-sm italic">No trailer available</p>;

  return (
    <div className="my-4">
      <ReactPlayer url={`https://www.youtube.com/watch?v=${trailer.key}`} controls width="100%" height="400px" />
    </div>
  );
}