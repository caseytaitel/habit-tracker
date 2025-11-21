const habitService = require("../services/habitService");

// GET /habits
const getHabits = async (req, res) => {
  try {
    const habits = await habitService.findAll();
    res.status(200).json({ habits });
  } catch (err) {
    console.error("Error fetching habits:", err);
    res.status(500).json({ error: "ServerError", message: "Failed to fetch habits." });
  }
};

// POST /habits
const createHabit = async (req, res) => {
  try {
    const { name, description, frequency } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        error: "ValidationError",
        message: "Name is required.",
      });
    }

    if (!["DAILY", "WEEKLY"].includes(frequency)) {
      return res.status(400).json({
        error: "ValidationError",
        message: "Frequency must be DAILY or WEEKLY.",
      });
    }

    const newHabit = await habitService.create({
      name,
      description: description || null,
      frequency,
      isActive: true,
      completedToday: false,
    });

    res.status(201).json({ habit: newHabit });
  } catch (err) {
    console.error("Error creating habit:", err);
    res.status(500).json({ error: "ServerError", message: "Failed to create habit." });
  }
};

// PUT /habits/:id
const updateHabit = async (req, res) => {
  try {
    const habitId = Number(req.params.id);
    const { name, description, frequency, isActive, completedToday } = req.body;

    const existing = await habitService.findById(habitId);
    if (!existing) {
      return res.status(404).json({
        error: "NotFound",
        message: "Habit not found.",
      });
    }

    const updated = await habitService.update(habitId, {
      name: name !== undefined ? name : existing.name,
      description: description !== undefined ? description : existing.description,
      frequency: frequency || existing.frequency,
      isActive: typeof isActive === "boolean" ? isActive : existing.isActive,
      completedToday:
        typeof completedToday === "boolean"
          ? completedToday
          : existing.completedToday,
    });

    res.status(200).json({ habit: updated });
  } catch (err) {
    console.error("Error updating habit:", err);
    res.status(500).json({ error: "ServerError", message: "Failed to update habit." });
  }
};

// DELETE (soft delete)
const deleteHabit = async (req, res) => {
  try {
    const habitId = Number(req.params.id);

    const existing = await habitService.findById(habitId);
    if (!existing) {
      return res.status(404).json({
        error: "NotFound",
        message: "Habit not found.",
      });
    }

    await habitService.softDelete(habitId);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error deleting habit:", err);
    res.status(500).json({ error: "ServerError", message: "Failed to delete habit." });
  }
};

module.exports = {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
};
