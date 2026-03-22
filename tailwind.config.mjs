/** @type {import('tailwindcss').Config} */
export default {
  // ここが超重要！どのファイルのクラス名を読み取るかを指定します
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
