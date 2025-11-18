// controllers/habitController.js

// GET /api/habits
// Return all habits (active + inactive) as placeholder static data
const getHabits = (req, res) => {
  const habits = [
    {
      id: 1,
      name: "Morning Exercise",
      description: "30 minutes of cardio",
      frequency: "DAILY",
      isActive: true,
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    {
      id: 2,
      name: "Read Books",
      description: "Read for 30 minutes",
      frequency: "DAILY",
      isActive: true,
      createdAt: "2024-01-02T00:00:00.000Z",
      updatedAt: "2024-01-02T00:00:00.000Z",
    },
    {
      id: 3,
      name: "Weekly Review",
      description: "Weekly planning session",
      frequency: "WEEKLY",
      isActive: false,
      createdAt: "2024-01-03T00:00:00.000Z",
      updatedAt: "2024-01-03T00:00:00.000Z",
    },
  ];

  res.status(200).json({ habits });
};

// POST /api/habits
// Accept { name, description?, frequency } and return placeholder Habit
const createHabit = (req, res) => {
  const { name, description, frequency } = req.body;

  // Minimal validation to match your spec
  if (!name) {
    return res.status(400).json({
      error: "ValidationError",
      message: "Name is required.",
      details: {},
    });
  }

  // In V1 placeholder mode, we ignore the actual DB and just construct a sample
  const habit = {
    id: 4,
    name,
    description: description || "",
    frequency: frequency || "DAILY",
    isActive: true,
    createdAt: "2024-01-04T00:00:00.000Z",
    updatedAt: "2024-01-04T00:00:00.000Z",
  };

  res.status(201).json({ habit });
};

// PUT /api/habits/:id
// Accept partial { name?, description?, frequency?, isActive? } and return placeholder updated Habit
const updateHabit = (req, res) => {
  const { id } = req.params;
  const { name, description, frequency, isActive } = req.body;

  const habit = {
    id: Number(id),
    name: name || "Updated Habit",
    description: description || "Updated description",
    frequency: frequency || "WEEKLY",
    isActive: typeof isActive === "boolean" ? isActive : true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-05T00:00:00.000Z",
  };

  res.status(200).json({ habit });
};

// DELETE /api/habits/:id
// Return success flag
const deleteHabit = (req, res) => {
  res.status(200).json({ success: true });
};

module.exports = {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
};
