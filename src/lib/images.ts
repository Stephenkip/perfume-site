export function placeholderImage({
  width = 800,
  height = 800,
  text = "Placeholder image — swap for real product photography",
  source = "placehold",
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

  if (source === "unsplash") {
    return `https://images.unsplash.com/photo-1619969720340-4a527a395c77?q=80&w=${width}&h=${height}&fit=crop`;
  }

  const bg = "ebe3d3";
  const fg = "2b0f12";
  return `https://placehold.co/${width}x${height}/${bg}/${fg}?text=${encodeURIComponent(text)}`;
}
