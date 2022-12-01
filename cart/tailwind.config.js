module.exports = {
  corePlugins: {
    preflight: false,
  },
  mode: "jit",
  purge: [
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
