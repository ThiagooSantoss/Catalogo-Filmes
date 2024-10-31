import flowbite from 'flowbite/plugin'; // Usando import ao invés de require

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}", // Adicionando o Flowbite aqui
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite],
};
