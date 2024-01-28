document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("game-board");
    const dots = [];

    // Create the game board with dots
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            dot.style.gridColumn = col + 1;
            dot.style.gridRow = row + 1;
            dot.dataset.row = row;
            dot.dataset.col = col;
            dot.addEventListener("click", () => handleDotClick(dot));
            board.appendChild(dot);
            dots.push(dot);
        }
    }

    // Handle dot click
    function handleDotClick(dot) {
        if (!dot.classList.contains("selected")) {
            dot.classList.add("selected");
            drawLines(dot);
        }
    }

    // Draw lines connecting selected dots
    function drawLines(dot) {
        const row = parseInt(dot.dataset.row);
        const col = parseInt(dot.dataset.col);
        const lines = [
            { row: row, col: col + 1 },
            { row: row + 1, col: col },
            { row: row, col: col - 1 },
            { row: row - 1, col: col }
        ];

        lines.forEach(line => {
            const neighborDot = dots.find(d => parseInt(d.dataset.row) === line.row && parseInt(d.dataset.col) === line.col);
            if (neighborDot && neighborDot.classList.contains("selected")) {
                const lineElement = createLine(dot, neighborDot);
                board.appendChild(lineElement);
                checkForSquare(dot);
                checkForSquare(neighborDot);
            }
        });
    }

    // Create a line between two dots
    function createLine(dot1, dot2) {
        const line = document.createElement("div");
        line.classList.add("line");
        const rect1 = dot1.getBoundingClientRect();
        const rect2 = dot2.getBoundingClientRect();
        const angle = Math.atan2(rect2.top - rect1.top, rect2.left - rect1.left);
        const distance = Math.hypot(rect2.top - rect1.top, rect2.left - rect1.left);
        line.style.width = `${distance}px`;
        line.style.transform = `translate(${rect1.left}px, ${rect1.top}px) rotate(${angle}rad)`;
        return line;
    }

    // Check if a square is formed
    function checkForSquare(dot) {
        const row = parseInt(dot.dataset.row);
        const col = parseInt(dot.dataset.col);
        const lines = [
            { row: row, col: col + 1 },
            { row: row + 1, col: col },
            { row: row, col: col - 1 },
            { row: row - 1, col: col }
        ];

        let squareFormed = true;
        lines.forEach(line => {
            const neighborDot = dots.find(d => parseInt(d.dataset.row) === line.row && parseInt(d.dataset.col) === line.col);
            if (!neighborDot || !neighborDot.classList.contains("selected")) {
                squareFormed = false;
            }
        });

        if (squareFormed) {
            alert("Square formed! Player gets a point.");
        }
    }
});
