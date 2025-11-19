function HabitItem({ habit, onEdit, onDelete }) {
    return (
      <li
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 0",
          borderBottom: "1px solid #eee",
        }}
      >
        <div>
          <div style={{ fontWeight: 600 }}>{habit.name}</div>
          {habit.description && (
            <div style={{ fontSize: "0.9rem", color: "#555" }}>
              {habit.description}
            </div>
          )}
          <div style={{ fontSize: "0.85rem", color: "#777" }}>
            Frequency: {habit.frequency}
          </div>
        </div>
  
        <div>
          <button onClick={() => onEdit(habit)} style={{ marginRight: "0.5rem" }}>
            Edit
          </button>
          <button onClick={() => onDelete(habit.id)}>Delete</button>
        </div>
      </li>
    );
  }
  
  export default HabitItem;
  