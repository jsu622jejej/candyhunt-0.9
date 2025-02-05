const board = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score");

const rows = 6;
const cols = 6;
const candyImages = [
    "https://raw.githubusercontent.com/jsu622jejej/test-candycrush/refs/heads/main/3d-halloween-candy-png.png",
    "https://raw.githubusercontent.com/jsu622jejej/test-candycrush/refs/heads/main/3d-illustration-purple-and-yellow-swirl-lollipop-has-a-yellow-stick-png.png",
    "https://raw.githubusercontent.com/jsu622jejej/test-candycrush/refs/heads/main/3d-rendering-of-halloween-day-icons-png.png",
    "https://raw.githubusercontent.com/jsu622jejej/test-candycrush/refs/heads/main/8772730.webp",
    "https://raw.githubusercontent.com/jsu622jejej/test-candycrush/refs/heads/main/candy-3d-illustration-png.png",
    "https://raw.githubusercontent.com/jsu622jejej/test-candycrush/refs/heads/main/candy-3d-rendering-isometric-icon-png.png",
    "https://raw.githubusercontent.com/jsu622jejej/test-candycrush/refs/heads/main/candy-corn-3d-halloween-icon-for-uiux-web-app-infographic-etc-png.png",
    "https://raw.githubusercontent.com/jsu622jejej/test-candycrush/refs/heads/main/chocolate-birthday-cake-3d-illustration-free-png.png",
    "https://raw.githubusercontent.com/jsu622jejej/test-candycrush/refs/heads/main/christmas-candy-3d-icon-render-illustration-free-png.png",
    "https://raw.githubusercontent.com/jsu622jejej/test-candycrush/refs/heads/main/muffin-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--delicious-logo-snack-tasty-food-junk-pack-drink-illustrations-3773453.png",
    "https://raw.githubusercontent.com/jsu622jejej/test-candycrush/refs/heads/main/party-blower-3d-render-icon-illustration-png.png",
    "https://raw.githubusercontent.com/jsu622jejej/test-candycrush/refs/heads/main/pngtree-a-sweet-3d-icon-of-star-with-cheerful-winking-face-surrounded-png-image_15137199.png",
    "https://raw.githubusercontent.com/jsu622jejej/test-candycrush/refs/heads/main/realistic-candy-design-for-playful-concepts-png.png",
    "https://raw.githubusercontent.com/jsu622jejej/test-candycrush/refs/heads/main/realistic-lollipop-design-with-vibrant-colors-png.png",
    "https://raw.githubusercontent.com/jsu622jejej/test-candycrush/refs/heads/main/watercolor-candy-hand-painted-sweet-clipart-png.png"
];

let score = 0;
let candies = [];

function getRandomCandy() {
    return candyImages[Math.floor(Math.random() * candyImages.length)];
}

function createBoard() {
    candies = [];
    board.innerHTML = "";
    for (let i = 0; i < rows * cols; i++) {
        let candy = document.createElement("img");
        candy.src = getRandomCandy();
        candy.classList.add("candy");
        candy.dataset.index = i;
        candy.addEventListener("click", () => selectCandy(i));
        board.appendChild(candy);
        candies.push(candy);
    }
}

let selectedCandy = null;

function selectCandy(index) {
    if (selectedCandy === null) {
        selectedCandy = index;
        candies[index].style.border = "2px solid white";
    } else {
        swapCandies(selectedCandy, index);
        selectedCandy = null;
    }
}

function swapCandies(index1, index2) {
    let tempSrc = candies[index1].src;
    candies[index1].src = candies[index2].src;
    candies[index2].src = tempSrc;

    checkMatches();
}

function checkMatches() {
    let matches = [];
    for (let i = 0; i < candies.length; i++) {
        let horizontalMatch = i % cols < cols - 2 &&
            candies[i].src === candies[i + 1].src &&
            candies[i].src === candies[i + 2].src;

        let verticalMatch = i < cols * (rows - 2) &&
            candies[i].src === candies[i + cols].src &&
            candies[i].src === candies[i + 2 * cols].src;

        if (horizontalMatch) matches.push(i, i + 1, i + 2);
        if (verticalMatch) matches.push(i, i + cols, i + 2 * cols);
    }

    if (matches.length > 0) {
        removeMatches(matches);
    }
}

function removeMatches(matches) {
    matches.forEach(index => {
        candies[index].src = getRandomCandy();
    });

    score += matches.length * 10;
    scoreDisplay.innerText = score;
}

createBoard();
