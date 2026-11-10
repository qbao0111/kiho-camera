"use client";

import NextImage, { type ImageProps } from "next/image";
import manifest from "@/data/image-variants.json";

type Variants = { width: number; height: number; variants: { src: string; width: number; height: number }[] };
type SourceImageProps = Omit<ImageProps, "loader" | "unoptimized">;

/** Native responsive selection from committed assets, with Next Image layout and lazy loading. */
export default function SourceImage({ src, priority, loading, sizes, quality: _quality, ...props }: SourceImageProps) {
  const entry = typeof src === "string" ? (manifest as Record<string, Variants>)[src] : undefined;
  if (!entry) return <NextImage {...props} src={src} sizes={sizes} priority={priority} loading={loading} unoptimized />;

  const fallback = entry.variants[entry.variants.length - 1];
  const sourceSizes = sizes || (props.width ? `${props.width}px` : "100vw");
  return (
    <picture style={props.fill ? { position: "absolute", inset: 0 } : undefined}>
      <source
        type="image/webp"
        srcSet={entry.variants.map(image => `${image.src} ${image.width}w`).join(", ")}
        sizes={sourceSizes}
      />
      {/* A Next preload would fetch the fallback as well as the picture candidate. */}
      <NextImage
        {...props}
        src={fallback.src}
        sizes={sourceSizes}
        unoptimized
        loading={priority ? "eager" : loading || "lazy"}
        fetchPriority={priority ? "high" : props.fetchPriority}
      />
    </picture>
  );
}
