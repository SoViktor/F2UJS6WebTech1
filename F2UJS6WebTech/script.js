document.addEventListener("DOMContentLoaded", () => {
    initBreedSwitch();
    initContactForm();
    initJsonPuppies();
    initVideoControls();
});

function initBreedSwitch() {
    const body = document.body;
    const switchEl = document.getElementById("breedSwitch");

    if (!switchEl) {
        return;
    }

    const savedBreed = localStorage.getItem("breed");
    let currentBreed = "whippet";

    if (savedBreed === "aussie" || savedBreed === "whippet") {
        currentBreed = savedBreed;
    }

    body.classList.remove("breed-whippet", "breed-aussie");
    body.classList.add("breed-" + currentBreed);

    switchEl.checked = (currentBreed === "aussie");

    updateBreedContent(currentBreed);

    switchEl.addEventListener("change", () => {
        const newBreed = switchEl.checked ? "aussie" : "whippet";

        body.classList.remove("breed-whippet", "breed-aussie");
        body.classList.add("breed-" + newBreed);

        localStorage.setItem("breed", newBreed);

        updateBreedContent(newBreed);

        $("header").stop(true, true).fadeOut(100).fadeIn(200);
    });
}

function updateBreedContent(breed) {
    const hasWhippetBlocks = document.querySelector(".breed-content.whippet");
    const hasAussieBlocks = document.querySelector(".breed-content.aussie");

    if (!hasWhippetBlocks && !hasAussieBlocks) {
        return;
    }

    if (breed === "whippet") {
        $(".breed-content.aussie").stop(true, true).fadeOut(150);
        $(".breed-content.whippet").stop(true, true).fadeIn(200);
    } else {
        $(".breed-content.whippet").stop(true, true).fadeOut(150);
        $(".breed-content.aussie").stop(true, true).fadeIn(200);
    }

    const whVideo = document.getElementById("videoWhippet");
    const auVideo = document.getElementById("videoAussie");

    if (whVideo || auVideo) {
        if (breed === "whippet") {
            if (auVideo) {
                auVideo.pause();
                auVideo.currentTime = 0;
            }
            if (whVideo) {
                whVideo.play().catch(() => {});
            }
        } else {
            if (whVideo) {
                whVideo.pause();
                whVideo.currentTime = 0;
            }
            if (auVideo) {
                auVideo.play().catch(() => {});
            }
        }
    }
}

function initVideoControls() {
    const boxes = document.querySelectorAll(".video-box");
    if (!boxes.length) {
        return;
    }

    boxes.forEach(box => {
        const video = box.querySelector("video");
        const playBtn = box.querySelector(".playBtn");
        const muteBtn = box.querySelector(".muteBtn");
        const volSlider = box.querySelector(".volumeSlider");

        if (!video || !playBtn || !muteBtn || !volSlider) {
            return;
        }

        video.muted = true;

        video.volume = parseFloat(volSlider.value) || 0.5;

        playBtn.addEventListener("click", () => {
            if (video.paused) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        });

        muteBtn.addEventListener("click", () => {
            video.muted = !video.muted;
            muteBtn.textContent = video.muted ? "🔇 Hang be/ki" : "🔊 Némítás";
        });

        volSlider.addEventListener("input", () => {
            const vol = parseFloat(volSlider.value);
            video.volume = vol;

            if (vol > 0) {
                video.muted = false;
                muteBtn.textContent = "🔊 Némítás";
            } else {
                video.muted = true;
                muteBtn.textContent = "🔇 Hang be/ki";
            }
        });
    });
}

function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) {
        return; 
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let isValid = true;

        function setError(inputEl, errorId, message) {
            if (inputEl) {
                inputEl.classList.add("error");
            }
            const errorBox = errorId ? document.getElementById(errorId) : null;
            if (errorBox) {
                errorBox.textContent = message || "";
            }
        }

        function clearError(inputEl, errorId) {
            if (inputEl) {
                inputEl.classList.remove("error");
            }
            const errorBox = errorId ? document.getElementById(errorId) : null;
            if (errorBox) {
                errorBox.textContent = "";
            }
        }

        const nameInput = document.getElementById("name");
        if (nameInput && nameInput.value.trim().length < 3) {
            setError(nameInput, "nameError", "Kérlek, adj meg egy legalább 3 karakteres nevet.");
            isValid = false;
        } else {
            clearError(nameInput, "nameError");
        }

        const emailInput = document.getElementById("email");
        const emailValue = emailInput ? emailInput.value.trim() : "";
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailValue) {
            setError(emailInput, "emailError", "Az e-mail cím megadása kötelező.");
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            setError(emailInput, "emailError", "Kérlek, valós e-mail címet adj meg.");
            isValid = false;
        } else {
            clearError(emailInput, "emailError");
        }

        const breedInput = document.getElementById("breedInput");
        if (breedInput && !breedInput.value.trim()) {
            setError(breedInput, "breedInputError", "Kérlek, válassz egy fajtát.");
            isValid = false;
        } else {
            clearError(breedInput, "breedInputError");
        }

        const litterCheckboxes = form.querySelectorAll('input[type="checkbox"][name^="litter"]');
        let anyLitterChecked = false;
        litterCheckboxes.forEach(cb => {
            if (cb.checked) {
                anyLitterChecked = true;
            }
        });

        const firstLitterCheckbox = litterCheckboxes.length ? litterCheckboxes[0] : null;
        if (!anyLitterChecked) {
            setError(firstLitterCheckbox, "litterError", "Kérlek, jelöld be, melyik almok érdekelnek.");
            isValid = false;
        } else {
            clearError(firstLitterCheckbox, "litterError");
        }

        const messageInput = document.getElementById("message");
        if (messageInput && messageInput.value.trim().length < 20) {
            setError(
                messageInput,
                "messageError",
                "Kérlek, írj legalább 20 karakteres bemutatkozó üzenetet."
            );
            isValid = false;
        } else {
            clearError(messageInput, "messageError");
        }

        if (isValid) {
            alert("Köszönjük az érdeklődést! (Demó – az űrlap valódi küldése nincs bekötve.)");
            form.reset();
        }
    });
}

function initJsonPuppies() {
    const container = document.getElementById("jsonPuppies");
    if (!container) {
        return;
    }

    const puppiesJson = `
    [
        {
            "name": "Rózsakvarc",
            "breed": "Whippet",
            "litter": "R-alom (2025 tavasz)",
            "status": "foglalható"
        },
        {
            "name": "Bently",
            "breed": "Australian Shepherd",
            "litter": "B-alom (2025 nyár)",
            "status": "foglalt"
        },
        {
            "name": "Dobby",
            "breed": "Whippet",
            "litter": "D-alom (2024 ősz)",
            "status": "foglalható"
        }
    ]
    `;

    let puppies = [];
    try {
        puppies = JSON.parse(puppiesJson);
    } catch (e) {
        console.error("Hiba a JSON feldolgozásakor:", e);
        return;
    }

    const $container = $("#jsonPuppies");

    puppies.forEach(dog => {
        const $row = $("<div>")
            .addClass("json-dog")
            .text(`${dog.name} – ${dog.breed} (${dog.litter}) – státusz: ${dog.status}`);
        $container.append($row);
    });
}
