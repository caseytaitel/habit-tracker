const habitService = require("../services/habitService");
const { validateHabitCreate, validateHabitUpdate } = require("../validators");
const { NotFoundError } = require("../errors");

// GET /habits
const getHabits = async (req, res, next) => {
  try {
    const habits = await habitService.getAll();
    res.json({ habits });
  } catch (err) {
    next(err);
  }
};

// POST /habits
const createHabit = async (req, res, next) => {
  try {
    validateHabitCreate(req.body);
    const habit = await habitService.create(req.body);
    res.status(201).json({ habit });
  } catch (err) {
    next(err);
  }
};

// PUT /habits/:id
const updateHabit = async (req, res, next) => {
  try {
    validateHabitUpdate(req.body);

    const habitId = Number(req.params.id);
    const existing = await habitService.findById(habitId);
    if (!existing) throw new NotFoundError("Habit not found");

    const updated = await habitService.update(habitId, req.body);
    res.json({ habit: updated });
  } catch (err) {
    next(err);
  }
};

// DELETE (soft delete)
const deleteHabit = async (req, res, next) => {
  try {
    const habitId = Number(req.params.id);

    const deleted = await habitService.softDelete(habitId);
    if (!deleted) {
      throw new NotFoundError("Habit not found.");
    }

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
};
