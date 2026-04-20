const cards = document.querySelectorAll(".theme-card");
const box = document.getElementById("theme-box");
const text = document.getElementById("theme-text");
const themesContainer = document.querySelector(".themes-container");

let activeTheme = null;

cards.forEach(card => {
    card.addEventListener("click", () => {
        const theme = card.dataset.theme;

        if (activeTheme === theme) {
            box.style.display = "none";
            activeTheme = null;
            card.classList.remove("active");
            return;
        }

        cards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");

        if (theme === "math") {
            text.textContent = "Early math skills play an important role in how children learn and think. In this game, children match numbers with the correct number of objects, helping them practice counting, recognize numbers, and strengthen their memory.";
        } else if (theme === "letters") {
            text.textContent = "Getting to know letters is an important step toward reading. In this game, children match uppercase and lowercase letters, helping them recognize and remember them more easily.";
        } else if (theme === "animals") {
            text.textContent = "Understanding the world around them is an important part of early learning. In this mode, children match animals with simple facts and behaviors, helping them build vocabulary and make real world connections.";
        } else if (theme === "geo") {
            text.textContent = "Learning about countries and flags helps children become familiar with the world around them. In this mode, they match flags with their countries, building recognition skills and sparking curiosity about different places.";
        } else if (theme === "shapes") {
            text.textContent = "Recognizing shapes is an important part of early visual and spatial development. In this mode, children match shapes and patterns, helping them understand how things fit together and strengthening problem-solving skills.";
        }

        activeTheme = theme;

        if (window.innerWidth <= 768) {
            card.appendChild(box);
        } else {
            themesContainer.appendChild(box);
        }

        box.style.display = "block";

        setTimeout(() => {
            box.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 50);
    });
});

const modal = document.getElementById("game-modal");
const closeGameBtn = document.getElementById("close-game-btn");
const openBtns = document.querySelectorAll(".open-game-btn");

openBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.remove("modal-hidden");
    });
});

closeGameBtn.addEventListener("click", () => {
    modal.classList.add("modal-hidden");
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("modal-hidden");
    }
});

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    questionBtn.addEventListener("click", () => {
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove("active");
            }
        });
        item.classList.toggle("active");
    });
});

const track = document.getElementById('t-cards-track');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

if(track && nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
        const cardWidth = track.querySelector('.t-card').offsetWidth + 20;

        if (Math.ceil(track.scrollLeft + track.clientWidth) >= track.scrollWidth - 10) {
            track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            track.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
    });

    prevBtn.addEventListener('click', () => {
        const cardWidth = track.querySelector('.t-card').offsetWidth + 20;

        if (track.scrollLeft <= 10) {
            track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
        } else {
            track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        }
    });
}

const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add("visible");
    } else {
        backToTopBtn.classList.remove("visible");
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});