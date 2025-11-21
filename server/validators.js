const { ValidationError } = require("./errors");

function validateHabitCreate({ name, frequency }) {
  if (!name || typeof name !== "string" || name.length > 100) {
    throw new ValidationError("Name is required and must be <= 100 chars.");
  }

  if (!["DAILY", "WEEKLY"].includes(frequency)) {
    throw new ValidationError("Frequency must be DAILY or WEEKLY.");
  }
}

function validateHabitUpdate(data) {
  if (data.name && data.name.length > 100) {
    throw new ValidationError("Name must be <= 100 chars.");
  }
}

module.exports = { validateHabitCreate, validateHabitUpdate };
