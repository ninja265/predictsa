"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

import { FALLBACK_IMAGE } from "@/lib/utils";

export function SafeImage(props: ImageProps) {
  const { src, alt, ...rest } = props;
  const [safeSrc, setSafeSrc] = useState<ImageProps["src"]>(src);

  return (
    <Image
      {...rest}
      src={safeSrc}
      alt={alt}
      onError={() => setSafeSrc(FALLBACK_IMAGE)}
    />
  );
}
