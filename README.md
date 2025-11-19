// Habit Tracker //
// Backend Skeleton -- Day 1 //

index.js: creates & starts Express server, enables CORS & JSON parsing, mounts base API path to habitRoutes.js
habitRoutes.js: creates router object, maps HTTP request methods (GET/POST/PUT/DELETE) to controller functions
habitController.js: holds final handlers (placeholder logic for now) -- getHabits, createHabit, updateHabit, deleteHabit

GET /api/habits --> getHabits --> returns all placeholder habits (active & inactive) with status 200
POST /api/habits --> createHabit --> validates name and either returns 400 with ValidationError or 201 with new Habit
PUT /api/habit/:id --> updateHabit --> returns updated Habit with status 201
DELETE /api/habit/:id --> deleteHabit --> deletes Habit with status 200 and success: true message

// DB Integration  -- Day 2 //

Prisma 5.16.2 + SQLite added into Express backend
schema.prisma:
    defines Habit model with id, name, description, frequency, isActive, createdAt, updatedAt
    frequency stored as a string, controller enforces “DAILY” or “WEEKLY”
prismaClient.js exports prisma object
	
Real CRUD functions:
    GET/POST/PUT/DELETE routes now call Prisma instead of static arrays
    GET uses prisma.habit.findMany() to return all habits
    POST validates the req.body, then uses prisma.habit.create() and returns 201 with { habit }
    PUT checks that the habit exists, then uses prisma.habit.update() and returns 200 with { habit } or 404 if not found
    DELETE implements a soft delete by setting isActive = false and returns { success: true}
