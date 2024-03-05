module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "translateX(0%)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(1%)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(-1%)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-out infinite",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      //
      "black",
      "business",
      "coffee",
      "dark",
      "dracula",
      "forest",
      "halloween",
      "luxury",
      "night",
      "synthwave",
    ],
    darkTheme: "black",
  },
};
