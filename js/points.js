(function () {
    const storagePrefix = "training-points-beginner:";
    const boxes = Array.from(document.querySelectorAll("[data-day-check]"));
    const totalEls = Array.from(document.querySelectorAll("[data-total-points]"));
    const maxEls = Array.from(document.querySelectorAll("[data-max-points]"));
    const meter = document.querySelector("[data-points-meter]");
    const weekPointEls = Array.from(document.querySelectorAll("[data-week-points]"));
    const maxPoints = boxes.reduce((sum, box) => sum + Number(box.dataset.points || 0), 0);

    function setText(elements, value) {
        elements.forEach(el => el.textContent = value);
    }

    function updateTotals() {
        let total = 0;
        const weekTotals = {};

        boxes.forEach(box => {
            const points = Number(box.dataset.points || 0);
            const card = box.closest(".week-card");
            const weekId = card ? card.id : "unknown";

            if (!weekTotals[weekId]) weekTotals[weekId] = 0;

            if (box.checked) {
                total += points;
                weekTotals[weekId] += points;
            }

            const workout = box.closest(".workout");
            if (workout) workout.classList.toggle("completed", box.checked);
        });

        setText(totalEls, total);
        setText(maxEls, maxPoints);

        if (meter) {
            const percent = maxPoints ? Math.round((total / maxPoints) * 100) : 0;
            meter.style.width = percent + "%";
        }

        weekPointEls.forEach(el => {
            const weekId = el.dataset.weekPoints;
            el.textContent = weekTotals[weekId] || 0;
        });
    }

    boxes.forEach(box => {
        const key = storagePrefix + box.dataset.dayCheck;
        box.checked = localStorage.getItem(key) === "true";
        box.addEventListener("change", () => {
            localStorage.setItem(key, box.checked ? "true" : "false");
            updateTotals();
        });
    });

    updateTotals();
})();