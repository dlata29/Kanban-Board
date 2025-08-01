let draggedCard = null;

async function loadTasks() {
  const res = await fetch("data.json");
  const data = await res.json();

  for (const [status, tasks] of Object.entries(data)) {
    const columnEl = document.querySelector(`[data-status="${status}"]`);
    if (!columnEl) continue;

    tasks.forEach((task) => {
      const card = createCard(task);
      columnEl.appendChild(card);
    });
  }
}

function createCard(task) {
  const card = document.createElement("div");
  card.className = "card";
  card.draggable = true;
  card.dataset.id = task.id;
  card.innerHTML = `<strong>${task.name}</strong><p>${task.description}</p>`;

  // Drag events
  card.addEventListener("dragstart", () => {
    draggedCard = card;
    card.classList.add("dragging");
  });

  card.addEventListener("dragend", () => {
    draggedCard = null;
    card.classList.remove("dragging");
  });

  card.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  card.addEventListener("dragenter", (e) => {
    if (card !== draggedCard) {
      card.classList.add("over");
    }
  });

  card.addEventListener("dragleave", () => {
    card.classList.remove("over");
  });

  card.addEventListener("drop", (e) => {
    e.preventDefault();
    if (card !== draggedCard) {
      card.classList.remove("over");
      card.parentNode.insertBefore(draggedCard, card);
    }
  });

  return card;
}

document.querySelectorAll(".column").forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  column.addEventListener("drop", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("column")) {
      e.target.appendChild(draggedCard);
    }
  });

  // column.classList.add("dropped");
  // setTimeout(() => column.classList.remove("dropped"), 300);
});

loadTasks();
