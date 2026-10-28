import { useState } from "react";
export default function Gallery({
  images,
  className = "",
  width = "100%",
  height = "570px",
  radius = "4px",
  showThumbs = false,
}) {
  const [index, setIndex] = useState(0);
  const current = Math.min(index, images.length - 1);
  if (!images.length) return <p>Sem imagens disponíveis.</p>;
  return (
    <div
      className={`gallery ${className}`}
      style={{
        maxWidth: width,
        "--gallery-height": height,
        "--gallery-radius": radius,
      }}
    >
      <div className="gallery-stage">
        <div
          className="gallery-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((image, i) => (
            <img
              key={`${image.src}-${i}`}
              src={image.src}
              alt={image.alt ?? `Imagem ${i + 1}`}
              style={{ backgroundColor: image.background }}
            />
          ))}
        </div>
        <button
          className="gallery-prev"
          aria-label="Imagem anterior"
          disabled={current === 0}
          onClick={() => setIndex(current - 1)}
        >
          ‹
        </button>
        <button
          className="gallery-next"
          aria-label="Próxima imagem"
          disabled={current === images.length - 1}
          onClick={() => setIndex(current + 1)}
        >
          ›
        </button>
        <span className="gallery-count" aria-live="polite">
          {current + 1} / {images.length}
        </span>
      </div>
      {!showThumbs && (
        <div className="gallery-dots" aria-label="Slides do destaque">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir para slide ${i + 1}`}
              aria-pressed={current === i}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
      {showThumbs && (
        <div className="thumbnails">
          {images.map((image, i) => (
            <button
              key={`${image.src}-${i}`}
              aria-label={`Ver imagem ${i + 1}`}
              aria-pressed={current === i}
              onClick={() => setIndex(i)}
            >
              <img
                src={image.src}
                alt=""
                style={{ backgroundColor: image.background }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
