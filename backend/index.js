import app from "./config/app/app.js";

const PORT = process.env.API_PATH || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
