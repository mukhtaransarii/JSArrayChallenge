    // Initialize parent array with 10 empty arrays, each having 10 empty slots
    let parentArray = Array.from({ length: 10 }, () => Array(10).fill(''));
    let wordLog = []; // Track word positions for deletion
    const maxWords = 45; // Max allowed words
    let wordCounter = 1; // Word counter to create sequential words (W1, W2, ...)

    function addSequentialWord() {
      // Check if the total words have reached the maximum limit
      if (wordLog.length >= maxWords) {
        // Remove the oldest word's position from the wordLog and clear it in the parent array
        const { arrayIndex, index } = wordLog.shift();
        parentArray[arrayIndex][index] = '';
      }

      // Create a sequential word like W1, W2, W3, ...
      const sequentialWord = `W${wordCounter}`;
      wordCounter++; // Increment counter for the next word

      // Find a random position to place the word
      let arrayIndex = Math.floor(Math.random() * 10);
      let index = Math.floor(Math.random() * 10);

      // Ensure that the chosen position is empty
      while (parentArray[arrayIndex][index] !== '') {
        arrayIndex = Math.floor(Math.random() * 10);
        index = Math.floor(Math.random() * 10);
      }

      // Place the new word and log its position
      parentArray[arrayIndex][index] = sequentialWord;
      wordLog.push({ arrayIndex, index });

      // Update the grid and word count display
      updateGrid();
      updateWordCount();
    }

    // Function to update the grid display
    function updateGrid() {
      const grid = document.getElementById('grid');
      grid.innerHTML = ''; // Clear the grid

      parentArray.forEach((row) => {
        row.forEach((cell) => {
          const cellDiv = document.createElement('div');
          cellDiv.textContent = cell;
          grid.appendChild(cellDiv);
        });
      });
    }

    // Function to update the word count display
    function updateWordCount() {
      const wordCount = wordLog.length;
      document.getElementById('wordCount').textContent = `Total Word Count: ${wordCount}`;
    }

    // Attach the function to the button click event
    document.getElementById("addWordButton").onclick = addSequentialWord;

    // Initial grid setup
    updateGrid();