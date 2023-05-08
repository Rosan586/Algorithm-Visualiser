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

async function insertionSort() {
    let n = array.length;

    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;

        // Shift the elements greater than the key to the right
        while (j >= 0 && array[j] > key) {
            let item1 = document.querySelectorAll('.array-item')[j];
            let item2 = document.querySelectorAll('.array-item')[j + 1];
            item1.classList.add('highlight');
            await new Promise(resolve => setTimeout(resolve, 500));
            swapItems(item1, item2);
            item1.classList.remove('highlight');
            array[j + 1] = array[j];
            j--;
        }

        array[j + 1] = key;
    }

    // Update the array container with the sorted array
    updateArrayContainer();
}

function swapItems(item1, item2) {
    let tempHeight = item1.style.height;
    let tempText = item1.textContent;
    item1.style.height = item2.style.height;
    item2.style.height = tempHeight;
    item1.textContent = item2.textContent;
    item2.textContent = tempText;

    swapIndicator.innerHTML = `Swapped ${item1.textContent} and ${item2.textContent}`;
    swapIndicator.style.display = 'block';
    setTimeout(() => {
        swapIndicator.style.display = 'none';
    }, 1000);
}
generateArray();