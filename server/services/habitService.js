const prisma = require("../prismaClient");

// Find all habits (no filters here — controller handles filtering)
async function getAll() {
  return prisma.habit.findMany();
}

// Find single habit by ID
async function findById(id) {
  return prisma.habit.findUnique({ where: { id } });
}

// Create habit
async function create(data) {
  return prisma.habit.create({ data });
}

// Update habit
async function update(id, data) {
  return prisma.habit.update({
    where: { id },
    data,
  });
}

// Soft delete
async function softDelete(id) {
  return prisma.habit.update({
    where: { id },
    data: { isActive: false },
  });
}

module.exports = {
  getAll,
  findById,
  create,
  update,
  softDelete,
};
