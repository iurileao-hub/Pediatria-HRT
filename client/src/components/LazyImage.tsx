import { useState, useEffect, useRef } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

export function LazyImage({ src, alt, className = "", placeholder }: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState(placeholder || "");
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!imageRef) return;

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Load the actual image when it comes into view
            const img = new Image();
            img.src = src;
            img.onload = () => {
              setImageSrc(src);
              setIsLoading(false);
            };
            // Disconnect observer after loading
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: "50px", // Start loading 50px before the image is visible
      }
    );

    observerRef.current.observe(imageRef);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [imageRef, src]);

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <img
        ref={setImageRef}
        src={imageSrc}
        alt={alt}
        className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        loading="lazy"
        data-testid={`lazy-image-${alt.replace(/\s+/g, '-').toLowerCase()}`}
      />
    </div>
  );
}

// Hook to process HTML content and add lazy loading to images
export function useLazyImages(htmlContent: string | null | undefined): string {
  if (!htmlContent) return "";

  // Replace img tags with data attributes for lazy loading
  return htmlContent.replace(
    /<img([^>]+)>/g,
    (match, attributes) => {
      // Add loading="lazy" attribute if not present
      if (!attributes.includes('loading=')) {
        return `<img${attributes} loading="lazy">`;
      }
      return match;
    }
  );
}