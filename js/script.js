document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("problem-form");
  const problemInput = document.getElementById("problem-input");
  const problemList = document.getElementById("problem-list");

  // 🔄 Charger les problèmes depuis la base
  fetch("get_problems.php")
    .then((res) => res.json())
    .then((data) => {
      problems = data;
      renderProblems();
    });

  // ➕ Ajouter un problème
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const problemText = problemInput.value.trim();
    if (!problemText) return;

    fetch("add_problem.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: problemText }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          location.reload(); // Recharge pour récupérer le nouveau problème
        }
      });
  });

  // ✅ Supprimer un problème
  problemList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const id = e.target.dataset.id;

      fetch("delete_problem.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            location.reload(); // Recharge pour mettre à jour la liste
          }
        });
    }
  });

  // 🧾 Afficher les problèmes
  function renderProblems() {
    problemList.innerHTML = "";
    problems.forEach((problem) => {
      const li = document.createElement("li");
      const timestamp = new Date(problem.created_at).getTime();
      const timeElapsed = formatTimeElapsed(timestamp);

      li.innerHTML = `
        <span>${problem.text}</span>
        <small>${timeElapsed}</small>
        <button data-id="${problem.id}">Résolu</button>
      `;
      problemList.appendChild(li);
    });
  }

  // ⏳ Formater le temps écoulé
  function formatTimeElapsed(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds} sec.`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min.`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} h`;
    const days = Math.floor(hours / 24);
    return `${days} j.`;
  }
});
