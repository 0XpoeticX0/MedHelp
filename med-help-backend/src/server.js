import app from "./app.js";
import { initializeDB } from "./config/initializeDB.js";

const PORT = process.env.PORT || 5000;

// Initialize DB and seed admin
initializeDB();
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
