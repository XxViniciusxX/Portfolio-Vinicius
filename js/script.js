const username = "XxViniciusxX";

const reposContainer = document.getElementById("repos");

fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(data => {

        reposContainer.innerHTML = "";

        data
        .filter(repo => !repo.fork) // remove fork
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .forEach(repo => {

            const div = document.createElement("div");
            div.classList.add("card", "fade-in");

            div.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || "Projeto sem descrição"}</p>
                <a href="${repo.html_url}" target="_blank" class="btn">
                    Ver Projeto
                </a>
            `;

            reposContainer.appendChild(div);
        });

    })
    .catch(() => {
        reposContainer.innerHTML = "<p>Erro ao carregar projetos 😢</p>";
    });