// Frontend Schema //

You are building a React frontend for my Habit Tracker app.

Use a single-page layout (no routing) with this component tree:

App
 ├─ HabitForm        (create/edit habit)
 └─ HabitList
      └─ HabitItem   (single habit row)

State shape in App:

- habits: Habit[]
- isLoading: boolean
- error: string | null
- formMode: "create" | "edit"
- selectedHabit: Habit | null
- isSubmitting: boolean

Habit type (from backend API):

type Habit = {
  id: number;
  name: string;
  description?: string;
  frequency: "DAILY" | "WEEKLY";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

API endpoints (backend already exists):

- GET /api/habits → { habits: Habit[] }
- POST /api/habits → { habit: Habit }
- PUT /api/habits/:id → { habit: Habit }
- DELETE /api/habits/:id → { success: true }

Requirements:

- On mount, App should:
  - set isLoading=true
  - fetch GET /api/habits
  - on success: set habits and isLoading=false
  - on error: set error and isLoading=false

- HabitForm:
  - Props: mode ("create" | "edit"), initialHabit, isSubmitting, onSubmit, onCancelEdit
  - mode="create": empty fields, "Create Habit" button
  - mode="edit": prefilled from initialHabit, "Update Habit" + "Cancel" buttons
  - When submitted, calls onSubmit(formValues) with { name, description, frequency }.

- HabitList:
  - Props: habits, onEdit(habit), onDelete(id)
  - Renders only habits where isActive === true (for now).

- App handles all API calls:
  - Create: POST /api/habits then append new habit to state.
  - Edit: PUT /api/habits/:id then replace habit in state.
  - Delete: DELETE /api/habits/:id then remove or hide that habit in state.
  - Show a basic error message when any request fails.

- Use functional components, hooks, and fetch() (no external data libs).
- Do not add routing or extra pages.
