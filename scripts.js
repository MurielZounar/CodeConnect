const uploadBtn = document.getElementById("upload-btn")
const inputUpload = document.getElementById("imagem-upload")

uploadBtn.addEventListener("click", () => {
    inputUpload.click()
})

function lerConteudoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader()

        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name })
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)
    })
}

const imagemPrincipal = document.querySelector(".main-img")
const nomeImagem = document.querySelector(".container-imagem-nome p")

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0]

    if (arquivo) {
        try {
            const conteudiArquivo = await lerConteudoArquivo(arquivo)
            imagemPrincipal.src = conteudiArquivo.url
            nomeImagem.textContent = conteudiArquivo.nome
        } catch (erro) {
            console.error("Erro na leitura do arquivo")
        }
    }
})

const inputTags = document.getElementById("input-tags")
const listaTags = document.getElementById("lista-tags")

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagRemove = evento.target.parentElement
        listaTags.removeChild(tagRemove)
    }
})

const tagsDisponiveis = [
    "Front-end",
    "Programação",
    "Dta Science",
    "JavaScript",
    "HTML",
    "CSS",
    "Fullstack",
]

async function tagsDisponiveisUso(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto))
        }, 1000)
    })
}

inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault()
        const tagTexto = inputTags.value.trim()

        if (tagTexto !== "") {
            try {
                const tagExiste = await tagsDisponiveisUso(tagTexto)

                if (tagExiste) {
                    const novaTag = document.createElement("li")
                    novaTag.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`
                    listaTags.appendChild(novaTag)
                    inputTags.value = ""
                } else {
                    alert("A tag não existe")
                }
            } catch (error) {
                console.error("Erro ao verificar existência da tag", error)
                alert(
                    "Erro ao verificar existência da tag. Verifique o Console"
                )
            }
        }
    }
})

const btnPublicar = document.querySelector(".botao-publicar")

async function publicarProjeto(nomeProjeto, descProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5

            if (deuCerto) {
                resolve("Projeto publicado com sucesso")
            } else {
                resolve("Erro ao publicar o projeto")
            }
        }, 2000)
    })
}

btnPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault()

    const nomeProjeto = document.getElementById("nome").value
    const descProjeto = document.getElementById("descricao").value
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map(
        (tag) => tag.textContent
    )

    try {
        const resultado = await publicarProjeto(
            nomeProjeto,
            descProjeto,
            tagsProjeto
        )
        console.log(resultado)
        alert("Tudo certo!")
    } catch (error) {
        console.error("Deu errado", error)
        alert("Deu errado!")
    }
})

const btnDescartar = document.querySelector(".botao-descartar")

btnDescartar.addEventListener("click", (evento) => {
    evento.preventDefault()

    const formulario = document.querySelector("form")
    formulario.reset()

    imagemPrincipal.src = "./img/imagem1.png"
    nomeImagem.textContent = "image_projeto.png"
    listaTags.innerHTML = ""
})
