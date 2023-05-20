const path = require("path");

const image = async (
  relativeSrc,
  alt,
  className,
  widths = [200, 400, 800, 1280],
  baseFormat = "jpeg",
  optimizedFormats = ["webp"],
  sizes = "100%"
) => {
  const fullSrc = path.join("src", relativeSrc);
  const { dir: imgDir } = path.parse(relativeSrc);
  const ImageWidths = {
    ORIGINAL: null,
    PLACEHOLDER: 24,
  };
  const imageMetadata = await Image(fullSrc, {
    widths: [ImageWidths.ORIGINAL, ImageWidths.PLACEHOLDER, ...widths],
    formats: [...optimizedFormats, baseFormat],
    outputDir: path.join("_site", imgDir),
    urlPath: imgDir,
  });
  const formatSizes = Object.entries(imageMetadata).reduce(
    (formatSizes, [format, images]) => {
      if (!formatSizes[format]) {
        const placeholder = images.find(
          (image) => image.width === ImageWidths.PLACEHOLDER
        );
        const largestVariant = images[images.length - 1];

        formatSizes[format] = {
          placeholder,
          largest: largestVariant,
        };
      }
      return formatSizes;
    },
    {}
  );

  const picture = `<picture class="${classNames("lazy-picture", className)}">
  ${Object.values(imageMetadata)
    .map((formatEntries) => {
      const { format: formatName, sourceType } = formatEntries[0];

      const placeholderSrcset = formatSizes[formatName].placeholder.url;
      const actualSrcset = formatEntries
        .filter((image) => image.width !== ImageWidths.PLACEHOLDER)
        .map((image) => image.srcset)
        .join(", ");

      return `<source type="${sourceType}" srcset="${placeholderSrcset}" data-srcset="${actualSrcset}" data-sizes="${sizes}">`;
    })
    .join("\n")}
    <img
      src="${formatSizes[baseFormat].placeholder.url}"
      data-src="${formatSizes[baseFormat].largest.url}"
      width="${formatSizes[baseFormat].largest.width}"
      height="${formatSizes[baseFormat].largest.height}"
      alt="${alt}"
      class="lazy-img"
      loading="lazy">
    </picture>`;

  return picture;
};

module.exports = image;
