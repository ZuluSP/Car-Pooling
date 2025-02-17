import app from './app';

const PORT = process.env.PORT || 9091;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
