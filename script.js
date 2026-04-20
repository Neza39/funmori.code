console.log("JS connected!");

const cards=document.querySelectorAll(".theme-card");
const box=document.getElementById("theme-box");
const text=document.getElementById("theme-text");
const modal=document.getElementById("gameModal")
const openBtn=document.querySelector(".try-btn")
const closeBtn=document.querySelector(".close-modal")

closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden")
})

openBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    modal.classList.remove("hidden");
})

let activeTheme = null;

cards.forEach(card=>{

    card.addEventListener("click",()=>{

        const theme=card.dataset.theme;
        console.log("Selected theme:", theme);

        if (activeTheme === theme) {
            box.style.display = "none";
            activeTheme = null;
            card.classList.remove("active");
            return;
        }

        cards.forEach(c => c.classList.remove("active"));

        card.classList.add("active");

        text.textContent=theme;

        if (theme === "math") {
            text.textContent="Early math skills play an important role in how children learn and think. In this game, children match numbers with the correct number of objects, helping them practice counting, recognize numbers, and strengthen their memory."
        }

        if (theme === "letters"){
            text.textContent="Getting to know letters is an important step toward reading. In this game, children match uppercase and lowercase letters, helping them recognize and remember them more easily."
        }

        if (theme === "animals"){
            text.textContent="Understanding the world around them is an important part of early learning. In this mode, children match animals with simple facts and behaviors, helping them build vocabulary and make real world connections."
        }

        if (theme === "geo"){
            text.textContent="Learning about countries and flags helps children become familiar with the world around them. In this mode, they match flags with their countries, building recognition skills and sparking curiosity about different places."
        }

        if (theme === "shapes"){
            text.textContent="Recognizing shapes is an important part of early visual and spatial development. In this mode, children match shapes and patterns, helping them understand how things fit together and strengthening problem-solving skills."
        }

        activeTheme = theme;

        box.style.display = "block";
        box.scrollIntoView({ behavior: "smooth" });

    })
})