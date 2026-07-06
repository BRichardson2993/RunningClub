
(function(){
  const STORE_PREFIX = "ten-mile-plan-complete:";
  const checks = document.querySelectorAll("[data-week-check]");
  checks.forEach(box => {
    const key = STORE_PREFIX + box.dataset.weekCheck;
    box.checked = localStorage.getItem(key) === "true";
    box.addEventListener("change", () => {
      localStorage.setItem(key, box.checked ? "true" : "false");
      updateCompleteCount();
    });
  });

  document.querySelectorAll("[data-toggle-week]").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".week-card");
      card.classList.toggle("collapsed");
    });
  });

  document.querySelectorAll("[data-collapse-all]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".week-card").forEach(card => card.classList.add("collapsed"));
    });
  });
  document.querySelectorAll("[data-expand-all]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".week-card").forEach(card => card.classList.remove("collapsed"));
    });
  });
  document.querySelectorAll("[data-print]").forEach(btn => btn.addEventListener("click", () => window.print()));

  function updateCompleteCount(){
    const count = [...document.querySelectorAll("[data-week-check]")].filter(c => c.checked).length;
    document.querySelectorAll("[data-complete-count]").forEach(el => el.textContent = count);
  }
  updateCompleteCount();
})();
