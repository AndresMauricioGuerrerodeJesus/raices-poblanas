// tailwind.config.js
export default {
  // ... resto del código
  theme: {
    extend: {
      colors: {
        'raices-brown': '#5D4037',
        'raices-green': '#2E7D32',
        'raices-accent': '#FFB300',
        'raices-light': '#FDFCF0',
      },
      fontFamily: {
        // 'Georgia' es elegante, clásica y está en todas las PC sin internet
        'serif': ['Georgia', 'serif'], 
        // 'Segoe UI' o 'Arial' son estándar para lectura rápida
        'sans': ['system-ui', 'sans-serif'],
      }
    },
  },
}