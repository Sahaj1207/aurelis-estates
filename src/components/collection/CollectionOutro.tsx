import React from "react";
import { collectionOutroData } from "./collectionData";

export const CollectionOutro: React.FC = () => {
  return (
    <div className="collection-outro-block mx-auto max-w-[1720px] px-6 sm:px-8 md:px-12 lg:px-16 py-20 md:py-32 lg:py-36">
      <div className="max-w-4xl">
        <h3 className="collection-outro-headline display-lg font-light font-serif text-[#f6f6f4] tracking-[-0.015em] leading-[1.02] mb-8">
          <span className="block">{collectionOutroData.headline.line1}</span>
          <span className="block">{collectionOutroData.headline.line2}</span>
          <span className="block text-[#dfd7c6]">{collectionOutroData.headline.line3}</span>
        </h3>
        <p className="collection-outro-copy max-w-[42ch] text-[13.5px] md:text-[14.5px] font-light leading-[1.7] text-[#c8c2b5]/85 font-sans">
          {collectionOutroData.supportingCopy}
        </p>
      </div>
    </div>
  );
};
