import HabitItem from "./HabitItem";

function HabitList({ habits, onEdit, onDelete, onToggleActive, onToggleCompletedToday }) {
  const activeHabits = habits.filter((h) => h.isActive !== false);

  if (activeHabits.length === 0) {
    return <p>No active habits yet.</p>;
  }

  return (
    <div>
      <h2>Your Habits</h2>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {activeHabits.map((habit) => (
          <HabitItem
            key={habit.id}
            habit={habit}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleActive={onToggleActive}
            onToggleCompletedToday={onToggleCompletedToday}
          />
        ))}
      </ul>
    </div>
  );
}

export default HabitList;
