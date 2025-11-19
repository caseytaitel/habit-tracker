# Habit Tracker – Backend V1 Spec (Week 8, Day 1)

This spec defines the backend V1 behavior for the Habit Tracker app. The backend is a Node + Express API with no database yet (placeholder data only).

---

## 1. Habit Model (V1)

Habit fields:
- id: number
- name: string (required, max length 100)
- description?: string (optional, max length 500)
- frequency: "DAILY" | "WEEKLY"
- isActive: boolean
- createdAt: string (ISO datetime)
- updatedAt: string (ISO datetime)

All Habit objects must follow this shape.

---

## 2. API Contract

Base path: /api/habits
All endpoints return JSON.

---

### 2.1 GET /api/habits

Return all habits (active + inactive) as placeholder static data.

Request:
- Method: GET
- Path: /api/habits
- Query: includeInactive=true|false (ignored in V1; always return all habits)

Success Response:
Status: 200
Body: { "habits": [ Habit[] ] }

Error Response:
Status: 500
Body: { "error": "ServerError", "message": "Something went wrong." }

---

### 2.2 POST /api/habits

Create a new habit (placeholder logic only).

Request:
Method: POST
Body fields:
- name (required)
- description? (optional)
- frequency ("DAILY" | "WEEKLY")

Success Response:
Status: 201
Body: { "habit": Habit }

Validation Error Response:
Status: 400
Body: { "error": "ValidationError", "message": "Name is required.", "details": {} }

---

### 2.3 PUT /api/habits/:id

Update an existing habit (placeholder logic only).

Request:
Method: PUT
Params: id
Body: any subset of { name, description, frequency, isActive }

Success Response:
Status: 200
Body: { "habit": updated Habit }

Not Found (for future when DB exists):
Status: 404
Body: { "error": "NotFound", "message": "Habit not found." }

---

### 2.4 DELETE /api/habits/:id

Delete a habit (placeholder only).

Success Response:
Status: 200
Body: { "success": true }

Not Found (future):
Status: 404
Body: { "error": "NotFound", "message": "Habit not found." }

---

## 3. Non-Goals for V1

V1 backend does NOT include:
- Database integration
- Real persistence
- Streaks or completion logs
- Tags or categories
- Reminders or notifications
- Calendar views or analytics
- Social features
- Authentication or user accounts

V1 is strictly: return static Habit data using this API contract.

---

## 4. Architecture Notes

Runtime: Node.js (CommonJS: require/module.exports)
Framework: Express
Middleware: cors(), express.json()

File structure:
server/
  index.js
  routes/habitRoutes.js
  controllers/habitController.js

Responsibilities:
- index.js: create Express app, enable CORS + JSON, mount /api/habits, start server
- habitRoutes.js: define GET/POST/PUT/DELETE routes and map to controllers
- habitController.js: implement placeholder logic, enforce status codes, follow Habit shape, no DB logic

---

## 5. Rules for Cursor AI

When generating or editing backend code:
1. Follow SPEC.md exactly.
2. Do NOT introduce DB logic, new fields, new routes, or new status codes.
3. Controllers must use the exact HTTP codes and response shapes defined here.
4. Habit shape must match this file.
5. Any contract change must be updated here first, then in code.
