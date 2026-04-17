export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 25px 80px rgba(139, 92, 246, 0.18)',
      },
      backgroundImage: {
        'royal-glow': 'radial-gradient(circle at top left, rgba(245, 158, 11, 0.18), transparent 35%)',
      },
    },
  },
  plugins: [],
};
