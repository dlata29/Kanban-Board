## Approach Used

1. Started with a `data.json` file containing task data grouped under sections like `todo`, `ongoing`, and `completed`. Each task includes a name, description, and optionally a list of comments.

2. On page load, JavaScript fetches the JSON file using the `fetch()` API. The tasks are rendered dynamically by iterating over each column and creating cards for each task.

3. Each task card is created using JavaScript and includes:
   - Task name and description
   - A comments section
   - An input box for adding new comments
   - A submit button for posting comments (appended instantly to the card)

4. Drag-and-drop functionality is enabled using native HTML5 drag events:
   - Cards can be dragged within the same column or moved to another column
   - When dragging, visual cues (CSS classes like `.dragging` or `.over`) are added for better UX


5. Comments are stored client-side:
   - Existing comments are loaded along with the task
   - New comments are appended directly to the DOM and stored in memory
   - Multiple people can add comments at once

