export function placeholderImage({
  width = 800,
  height = 800,
  text = "Placeholder image — swap for real product photography",
  source = "unsplash",
}: {
  width?: number;
  height?: number;
  text?: string;
  source?: "placehold" | "unsplash";
}): string {
  const keywords = encodeURIComponent(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/gi, " ")
      .trim()
      .split(/\s+/)
      .slice(0, 3)
      .join(",") || "perfume"
  );

  if (source === "placehold") {
    const bg = "ebe3d3";
    const fg = "2b0f12";
    return `https://placehold.co/${width}x${height}/${bg}/${fg}?text=${encodeURIComponent(text)}`;
  }

  return `https://source.unsplash.com/random/${width}x${height}/?${keywords}`;
}
