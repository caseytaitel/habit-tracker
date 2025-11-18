const express = require('express');
const cors = require("cors");
const habitRoutes = require('./routes/habitRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/habits', habitRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
