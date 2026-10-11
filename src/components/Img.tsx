import React from "react";

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  ref?: React.Ref<HTMLImageElement>;
};

// Every photograph in /images ships as a 1376w master plus an 800w rendition
// (see scripts/optimize-images.mjs); the browser picks whichever fits the slot.
export const Img: React.FC<ImgProps> = ({
  src,
  sizes = "(min-width: 1024px) 66vw, 100vw",
  loading = "lazy",
  ...rest
}) => {
  const responsive = src.startsWith("/images/") && src.endsWith(".webp");

  return (
    <img
      src={src}
      srcSet={
        responsive
          ? `${src.replace(/\.webp$/, "-800.webp")} 800w, ${src} 1376w`
          : undefined
      }
      sizes={responsive ? sizes : undefined}
      loading={loading}
      decoding="async"
      {...rest}
    />
  );
};
