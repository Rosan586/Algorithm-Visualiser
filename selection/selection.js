let array = [];
let arraySizeInput = document.getElementById('arraySizeInput');
let arrayContainer = document.getElementById('arrayContainer');
let swapIndicator = document.getElementById('swapIndicator');

function generateArray() {
    let size = arraySizeInput.value;
    array = [];

    // Generate random integers and add them to the array
    for (let i = 0; i < size; i++) {
        let num = Math.floor(Math.random() * 70);
        array.push(num);
    }

    // Update the array container with the new array
    updateArrayContainer();
}

function updateArrayContainer() {
    // Clear the array container
    arrayContainer.innerHTML = '';

    // Add each array item to the container
    for (let i = 0; i < array.length; i++) {
        let item = document.createElement('div');
        item.className = 'array-item';
        item.style.height = (array[i] * 5) + 'px';
        item.textContent = array[i];
        arrayContainer.appendChild(item);
    }
}

async function selectionSort() {
    let n = array.length;

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        // Find the minimum element in the unsorted part of the array
        for (let j = i + 1; j < n; j++) {
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }

        // Highlight the items being swapped
        let item1 = document.querySelectorAll('.array-item')[i];
        let item2 = document.querySelectorAll('.array-item')[minIdx];
        item1.classList.add('highlight');
        item2.classList.add('highlight');

        // Swap the items
        await sleep(500);
        swap(i, minIdx);

        // Remove the highlight from the swapped items
        item1.classList.remove('highlight');
        item2.classList.remove('highlight');
    }

    // Show the sorted array
    updateArrayContainer();
}

function swap(i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    updateArrayContainer();
    showSwapIndicator(i, j);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function showSwapIndicator(i, j) {
    let indicatorText = `Swapped ${array[j]} with ${array[i]}`;
    swapIndicator.textContent = indicatorText;
    swapIndicator.style.display = 'block';
    setTimeout(() => {
        swapIndicator.style.display = 'none';
    }, 2000);
}

generateArray();