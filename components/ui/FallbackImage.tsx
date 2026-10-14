'use client';

import React, { useState } from 'react';

interface FallbackImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc: string;
}

export default function FallbackImage({ src, fallbackSrc, alt, loading = "lazy", decoding = "async", ...props }: FallbackImageProps) {
  const [prevSrc, setPrevSrc] = useState(src);
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  if (prevSrc !== src) {
    setPrevSrc(src);
    setImgSrc(src);
    setHasError(false);
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      loading={loading}
      decoding={decoding}
      {...props}
      src={imgSrc || fallbackSrc}
      alt={alt || ''}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}
