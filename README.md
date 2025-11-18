// Habit Tracker //
// Backend Skeleton -- Day 1 //

index.js: creates & starts Express server, enables CORS & JSON parsing, mounts base API path to habitRoutes.js
habitRoutes.js: creates router object, maps HTTP request methods (GET/POST/PUT/DELETE) to controller functions
habitController.js: holds final handlers (placeholder logic for now) -- getHabits, createHabit, updateHabit, deleteHabit

GET /api/habits --> getHabits --> returns all placeholder habits (active & inactive) with status 200
POST /api/habits --> createHabit --> validates name and either returns 400 with ValidationError or 201 with new Habit
PUT /api/habit/:id --> updateHabit --> returns updated Habit with status 201
DELETE /api/habit/:id --> deleteHabit --> deletes Habit with status 200 and success: true message

No DB exists yet, everything is still in-memory placeholder data. Prisma + SQLite will be added in Day 2.