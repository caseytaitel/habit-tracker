const prisma = require("../prismaClient");

// GET /api/habits
const getHabits = async (req, res) => {
  try {
    const habits = await prisma.habit.findMany();
    res.status(200).json({ habits });
  } catch (err) {
    console.error("Error getting habits:", err);
    res.status(500).json({
      error: "ServerError",
      message: "Something went wrong.",
    });
  }
};

// POST /api/habits
const createHabit = async (req, res) => {
  try {
    const { name, description, frequency } = req.body;

    if (!name) {
      return res.status(400).json({
        error: "ValidationError",
        message: "Name is required.",
        details: {},
      });
    }

    if (frequency !== "DAILY" && frequency !== "WEEKLY") {
      return res.status(400).json({
        error: "ValidationError",
        message: "Frequency must be DAILY or WEEKLY.",
        details: {},
      });
    }

    const habit = await prisma.habit.create({
      data: {
        name,
        description: description || "",
        frequency,          // stored as String in DB
        isActive: true,
      },
    });

    res.status(201).json({ habit });
  } catch (err) {
    console.error("Error creating habit:", err);
    res.status(500).json({
      error: "ServerError",
      message: "Something went wrong.",
    });
  }
};

// PUT /api/habits/:id
const updateHabit = async (req, res) => {
  const { id } = req.params;
  const { name, description, frequency, isActive } = req.body;

  try {
    const habitId = Number(id);

    const existing = await prisma.habit.findUnique({
      where: { id: habitId },
    });

    if (!existing) {
      return res.status(404).json({
        error: "NotFound",
        message: "Habit not found.",
      });
    }

    const habit = await prisma.habit.update({
      where: { id: habitId },
      data: {
        name: name !== undefined ? name : existing.name,
        description:
          description !== undefined ? description : existing.description,
        frequency: frequency || existing.frequency,
        isActive:
          typeof isActive === "boolean" ? isActive : existing.isActive,
      },
    });

    res.status(200).json({ habit });
  } catch (err) {
    console.error("Error updating habit:", err);
    res.status(500).json({
      error: "ServerError",
      message: "Something went wrong.",
    });
  }
};

// DELETE /api/habits/:id (soft delete)
const deleteHabit = async (req, res) => {
  const { id } = req.params;

  try {
    const habitId = Number(id);

    const existing = await prisma.habit.findUnique({
      where: { id: habitId },
    });

    if (!existing) {
      return res.status(404).json({
        error: "NotFound",
        message: "Habit not found.",
      });
    }

    await prisma.habit.update({
      where: { id: habitId },
      data: { isActive: false },
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error deleting habit:", err);
    res.status(500).json({
      error: "ServerError",
      message: "Something went wrong.",
    });
  }
};

module.exports = {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
};
