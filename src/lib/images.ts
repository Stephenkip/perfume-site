export function placeholderImage({
  width = 800,
  height = 800,
  text = "Placeholder image — swap for real product photography",
}: {
  width?: number;
  height?: number;
  text?: string;
}): string {
  const label = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .slice(0, 48);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 800 800">
      <defs>
        <linearGradient id="wash" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f4efe4"/>
          <stop offset="1" stop-color="#d8bca4"/>
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#fff9ef" stop-opacity=".9"/>
          <stop offset="1" stop-color="#b4431f" stop-opacity=".45"/>
        </linearGradient>
      </defs>
      <rect width="800" height="800" fill="url(#wash)"/>
      <circle cx="650" cy="165" r="190" fill="#fff9ef" opacity=".35"/>
      <ellipse cx="400" cy="680" rx="190" ry="28" fill="#2b0f12" opacity=".12"/>
      <rect x="350" y="198" width="100" height="78" rx="12" fill="#2b0f12"/>
      <rect x="370" y="160" width="60" height="48" rx="8" fill="#b4431f"/>
      <rect x="265" y="265" width="270" height="360" rx="64" fill="url(#glass)" stroke="#fff9ef" stroke-width="8"/>
      <rect x="290" y="370" width="220" height="155" rx="8" fill="#f4efe4" opacity=".88"/>
      <text x="400" y="438" text-anchor="middle" fill="#2b0f12" font-family="Georgia,serif" font-size="28" font-style="italic">OEA</text>
      <text x="400" y="475" text-anchor="middle" fill="#2b0f12" font-family="Arial,sans-serif" font-size="13" letter-spacing="2">${label}</text>
    </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
