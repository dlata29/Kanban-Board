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

  // Create inner content
  card.innerHTML = `
    <strong>${task.name}</strong>
    <p>${task.description}</p>
    <div class="comments"></div>
    <input type="text" class="comment-input" placeholder="Add a comment" />
    <button class="add-comment">Add</button>
  `;

  const commentsContainer = card.querySelector(".comments");
  const input = card.querySelector(".comment-input");
  const addBtn = card.querySelector(".add-comment");

  // Render existing comments if any
  if (task.comments && Array.isArray(task.comments)) {
    task.comments.forEach((comment) => {
      const p = document.createElement("p");
      p.textContent = comment;
      commentsContainer.appendChild(p);
    });
  }
  //comments
  addBtn.addEventListener("click", () => {
    const commentText = input.value.trim();
    if (!commentText) return;

    const p = document.createElement("p");
    p.textContent = commentText;
    commentsContainer.appendChild(p);

    // Save in-memory (extend this for backend/future save)
    if (!task.comments) task.comments = [];
    task.comments.push(commentText);

    input.value = "";
  });

  //dragging of any box called
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

//dropping of column
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
});

loadTasks();
