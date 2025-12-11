// ---------- armazenamento ----------
const livros = JSON.parse(localStorage.getItem("livros")) || [];

// salva o array 'livros' no localStorage (persistência)
function salvar() {
    localStorage.setItem("livros", JSON.stringify(livros));
}

// ---------- operação de cadastro ----------
// Lê os valores dos inputs, valida e adiciona o objeto ao array
function cadastrar() {
    const nomeEl = document.getElementById("nomeLivro");
    const codigoEl = document.getElementById("codigoLivro");

    const nome = nomeEl.value.trim();
    const codigo = codigoEl.value.trim();

    // valida campos obrigatórios
    if (nome === "" || codigo === "") {
        alert("Preencha todos os campos");
        return;
    }

    // evita códigos duplicados
    if (livros.some(l => l.codigo === codigo)) {
        alert("Já existe um livro com esse código.");
        return;
    }

    // adiciona novo livro e persiste
    livros.push({ nome, codigo });
    salvar();

    console.log(`Nome: ${nome}  Código: ${codigo}`);

    nomeEl.value = "";
    codigoEl.value = "";

    listar();
}

// ---------- renderização da lista (DOM seguro) ----------
function listar() {
    const area = document.getElementById("lista");
    area.innerHTML = "";

    if (livros.length === 0) {
        const p = document.createElement('p');
        p.textContent = "Nenhum livro cadastrado.";
        area.appendChild(p);
        return;
    }

    livros.forEach((livro, i) => {
        const p = document.createElement('p');

        const text = document.createElement('span');
        text.textContent = `${i + 1}. ${livro.nome} - Código: ${livro.codigo} `;
        p.appendChild(text);

        const btnEdit = document.createElement('button');
        btnEdit.textContent = 'Editar';
        btnEdit.addEventListener('click', () => editar(i));
        p.appendChild(btnEdit);

        const btnDel = document.createElement('button');
        btnDel.textContent = 'Excluir';
        btnDel.addEventListener('click', () => deletar(i));
        p.appendChild(btnDel);

        area.appendChild(p);
    });
}

let editIndex = null;
let deleteIndex = null;

/* ---------- MODAL EDITAR ---------- */
function editar(i) {
    editIndex = i;

    document.getElementById("editNome").value = livros[i].nome;
    document.getElementById("editCodigo").value = livros[i].codigo;

    document.getElementById("modal-editar").style.display = "flex";
}

function fecharEditar() {
    document.getElementById("modal-editar").style.display = "none";
}

function salvarEdicao() {
    const novoNome = document.getElementById("editNome").value.trim();
    const novoCodigo = document.getElementById("editCodigo").value.trim();

    if (novoNome === "" || novoCodigo === "") return;

    // checa duplicidade se o código foi alterado
    if (novoCodigo !== livros[editIndex].codigo && livros.some((l, idx) => idx !== editIndex && l.codigo === novoCodigo)) {
        alert("Já existe um livro com esse código.");
        return;
    }

    livros[editIndex].nome = novoNome;
    livros[editIndex].codigo = novoCodigo;

    salvar();
    listar();
    fecharEditar();
}

/* ---------- MODAL EXCLUIR ---------- */
function deletar(i) {
    deleteIndex = i;
    document.getElementById("modal-excluir").style.display = "flex";
}

function fecharExcluir() {
    document.getElementById("modal-excluir").style.display = "none";
}

function confirmarExclusao() {
    livros.splice(deleteIndex, 1);
    salvar();
    listar();
    fecharExcluir();
}

