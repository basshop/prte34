'use client';

import { useEffect, useRef } from 'react';
import Plyr from 'plyr';
import Hls from 'hls.js';
import 'plyr/dist/plyr.css';

interface VideoPlayerProps {
  src: string;
  type?: '/video/mp4' | 'application/x-mpegURL';
  poster?: string;
}

export default function VideoPlayer({ src, type = '/video/mp4', poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (type === 'application/x-mpegURL' && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        new Plyr(video);
      });

      return () => hls.destroy();
    } else {
      new Plyr(video);
    }
  }, [src, type]);

  return (
    <div className="w-full max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow-lg">
      <video
        ref={videoRef}
        controls
        playsInline
        crossOrigin="anonymous"
        poster={poster}
        className="w-full h-full"
      >
        <source src={src} type={type} />
      </video>
    </div>
  );
}
