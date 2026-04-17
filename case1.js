(function () {
    const canvas = document.getElementById("case1-demo-canvas");

    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
        return;
    }
    const width = canvas.width;
    const height = canvas.height;
    const columns = 3;
    const maxTurns = 3;
    const cardWidth = 150;
    const cardHeight = 118;
    const gap = 18;
    const startX = 64;
    const startY = 112;
    const palette = {
        bgTop: "#fff9dd",
        bgBottom: "#ffe7b3",
        panel: "#fff5cf",
        cardBack: "#ffb649",
        cardBackEdge: "#d17d0c",
        cardFace: "#fffef8",
        text: "#472400",
        accent: "#ff7a00",
        shade: "rgba(71, 36, 0, 0.12)"
    };
    const symbols = [
        { key: "🌞", color: "#ff8a00" },
        { key: "🌛", color: "#7a5cff" },
        { key: "⭐", color: "#00a86b" }
    ];

    let cards = [];
    let flipped = [];
    let turns = 0;
    let lockBoard = false;
    let demoEnded = false;

    function shuffle(list) {
        const copy = list.slice();

        for (let i = copy.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = copy[i];
            copy[i] = copy[j];
            copy[j] = temp;
        }

        return copy;
    }

    function roundRect(x, y, w, h, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + w, y, x + w, y + h, radius);
        ctx.arcTo(x + w, y + h, x, y + h, radius);
        ctx.arcTo(x, y + h, x, y, radius);
        ctx.arcTo(x, y, x + w, y, radius);
        ctx.closePath();
    }

    function buildCards() {
        return shuffle(symbols.flatMap((item) => [item, item])).map((item, index) => {
            const column = index % columns;
            const row = Math.floor(index / columns);

            return {
                x: startX + column * (cardWidth + gap),
                y: startY + row * (cardHeight + gap),
                width: cardWidth,
                height: cardHeight,
                symbol: item.key,
                color: item.color,
                flipped: false,
                matched: false
            };
        });
    }

    function drawCard(card) {
        ctx.save();
        ctx.translate(card.x, card.y);

        ctx.fillStyle = palette.shade;
        roundRect(0, 6, card.width, card.height, 20);
        ctx.fill();

        if (card.flipped || card.matched) {
            ctx.fillStyle = palette.cardFace;
            roundRect(0, 0, card.width, card.height, 20);
            ctx.fill();

            ctx.strokeStyle = card.color;
            ctx.lineWidth = 4;
            roundRect(0, 0, card.width, card.height, 20);
            ctx.stroke();

            ctx.fillStyle = card.color;
            ctx.font = "bold 28px Arial";
            ctx.textAlign = "center";
            ctx.fillText(card.symbol, card.width / 2, 68);

            ctx.fillStyle = palette.text;
            ctx.font = "16px Arial";
            //ctx.fillText("match mig", card.width / 2, 92);
        } else {
            ctx.fillStyle = palette.cardBack;
            roundRect(0, 0, card.width, card.height, 20);
            ctx.fill();

            ctx.strokeStyle = palette.cardBackEdge;
            ctx.lineWidth = 4;
            roundRect(0, 0, card.width, card.height, 20);
            ctx.stroke();

            ctx.fillStyle = "#fff7e5";
            ctx.font = "bold 48px Arial";
            ctx.textAlign = "center";
            ctx.fillText("?", card.width / 2, 74);
        }

        ctx.restore();
    }

    function drawOverlay() {
        if (!demoEnded) {
            return;
        }

        ctx.fillStyle = "rgba(38, 20, 0, 0.55)";
        roundRect(40, 88, width - 80, height - 132, 28);
        ctx.fill();

        ctx.fillStyle = "#fff9ef";
        ctx.textAlign = "center";
        ctx.font = "bold 34px Arial";
        ctx.fillText("Demoen er slut", width / 2, 188);

        ctx.font = "20px Arial";
        ctx.fillText("Klik for at starte demoen igen.", width / 2, 228);

        ctx.fillStyle = palette.accent;
        roundRect(width / 2 - 106, 258, 212, 54, 18);
        ctx.fill();

        ctx.fillStyle = "#fff";
        ctx.font = "bold 20px Arial";
        ctx.fillText("Prøv igen", width / 2, 292);
    }

    function draw() {
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, palette.bgTop);
        gradient.addColorStop(1, palette.bgBottom);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = palette.panel;
        roundRect(24, 20, width - 48, 72, 24);
        ctx.fill();

        ctx.fillStyle = palette.text;
        ctx.textAlign = "left";
        ctx.font = "bold 26px Arial";
        ctx.fillText("Memory – Learn and grow", 44, 52);

        ctx.font = "18px Arial";
        ctx.fillText("Match et par kort.", 44, 78);

        ctx.textAlign = "right";
        ctx.font = "bold 20px Arial";
        //ctx.fillText("Træk: " + turns + " / " + maxTurns, width - 44, 60);

        cards.forEach(drawCard);
        drawOverlay();
    }

    function finishDemo() {
        demoEnded = true;
        draw();
    }

    function resetGame() {
        cards = buildCards();
        flipped = [];
        turns = 0;
        lockBoard = false;
        demoEnded = false;
        draw();
    }

    function resolveTurn() {
        const [firstIndex, secondIndex] = flipped;
        const firstCard = cards[firstIndex];
        const secondCard = cards[secondIndex];

        turns += 1;

        if (firstCard.symbol === secondCard.symbol) {
            firstCard.matched = true;
            secondCard.matched = true;
            flipped = [];
            lockBoard = false;
            draw();

            if (turns >= maxTurns || cards.every((card) => card.matched)) {
                window.setTimeout(finishDemo, 260);
            }

            return;
        }

        draw();

        window.setTimeout(() => {
            firstCard.flipped = false;
            secondCard.flipped = false;
            flipped = [];
            lockBoard = false;
            draw();

            if (turns >= maxTurns) {
                window.setTimeout(finishDemo, 180);
            }
        }, 700);
    }

    function cardAt(x, y) {
        return cards.findIndex((card) => (
            x >= card.x &&
            x <= card.x + card.width &&
            y >= card.y &&
            y <= card.y + card.height
        ));
    }

    canvas.addEventListener("click", (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left) * (width / rect.width);
        const y = (event.clientY - rect.top) * (height / rect.height);

        if (demoEnded) {
            resetGame();
            return;
        }

        if (lockBoard) {
            return;
        }

        const index = cardAt(x, y);

        if (index === -1) {
            return;
        }

        const card = cards[index];

        if (card.flipped || card.matched) {
            return;
        }

        card.flipped = true;
        flipped.push(index);
        draw();

        if (flipped.length === 2) {
            lockBoard = true;
            window.setTimeout(resolveTurn, 300);
        }
    });

    resetGame();
}());
