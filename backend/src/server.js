const app = require('./app');

// Pick port from environment or fallback to default 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server is running on http://0.0.0.0:${PORT}`);
  console.log(`Local network access available at http://192.168.0.186:${PORT}`);
});
