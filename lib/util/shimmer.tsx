//from https://github.com/vercel/next.js/blob/canary/examples/image-component/pages/shimmer.tsx
// eslint-disable-next-line import/no-anonymous-default-export
export default (w: number, h: number) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#334155" offset="20%" />
      <stop stop-color="#475569" offset="50%" />
      <stop stop-color="#334155" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#334155" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`