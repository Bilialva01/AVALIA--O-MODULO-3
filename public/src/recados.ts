
const usuariologado: any = JSON.parse(
  localStorage.getItem("usuariologado") || "[]"
);

const form: any = document.querySelector("#infos_recados");
const corpoTabela: any = document.querySelector("#tbody");

let estamosEditando: any = false;
let indiceEdicao: any = 0;

const recuperarLocalStorage = () => {
  const listaDeRecados = JSON.parse(
    localStorage.getItem(usuariologado) || "[]"
  );
  return listaDeRecados;
};

const atualizarLocalStorage = (listaDeRecados) => {
  localStorage.setItem(usuariologado, JSON.stringify(listaDeRecados));
};

const salvarRecado = (event) => {
  event.preventDefault();

  const nome: any = form.nomeRecado.value;
  const descricao: any = form.descRecado.value;

  const listaDeRecados: any = recuperarLocalStorage();

  if (estamosEditando === true) {
    const recadoParaEditar: any = listaDeRecados[indiceEdicao];
    recadoParaEditar.nome = nome;
    recadoParaEditar.descricao = descricao;
    listaDeRecados[indiceEdicao] = recadoParaEditar;
    estamosEditando = false;
    alert("Recado editado com sucesso!");
  } else {
    listaDeRecados.push({
      id: definirID() + 1,
      nome,
      descricao,
    });
    alert("Recado adicionado com sucesso!");
  }

  atualizarLocalStorage(listaDeRecados);
  preencherTabela();
  form.reset();
};

const preencherTabela = () => {
  const listaDeRecados: any = recuperarLocalStorage();
  corpoTabela.innerHTML = "";
  for (const recado of listaDeRecados) {
    corpoTabela.innerHTML += `
          <tr>
            <td>${recado.id}</td>
            <td>${recado.nome}</td>
            <td>${recado.descricao}</td>
            <td>
              <img class="imgButton"
                src="../images/pencil-square.svg"
                alt="imagem de anotacao"
                onclick="editarRecado(${recado.id})">
            </td>
            <td>
              <img class="imgButton"
                src="../images/trash3 (1).svg"
                alt="imagem de anotacao"
                onclick="removerRecado(${recado.id})">
            </td>
          </tr>
         `;
  }
};
const removerRecado = (id) => {
  const listaDeRecados: any = recuperarLocalStorage();
  const indiceRecado: any = listaDeRecados.findIndex(
    (recado) => recado.id === id
  );
  if (indiceRecado < 0) return;
  listaDeRecados.splice(indiceRecado, 1);
  atualizarLocalStorage(listaDeRecados);
  alert("Recado removido com sucesso!");
  preencherTabela();
};

const editarRecado = (id) => {
  const listaDeRecados: any = recuperarLocalStorage();
  const indiceRecado: any = listaDeRecados.findIndex(
    (recado) => recado.id === id
  );
  const recadoEdit: any = listaDeRecados[indiceRecado];
  form.nomeRecado.value = recadoEdit.nome;
  form.descRecado.value = recadoEdit.descricao;
  estamosEditando = true;
  indiceEdicao = indiceRecado;
};

const definirID = () => {
  let max: any = 0;
  const listaDeRecados: any = recuperarLocalStorage();
  listaDeRecados.forEach((recado) => {
    if (recado.id > max) {
      max = recado.id;
    }
  });
  return max;
};

form.addEventListener("submit", salvarRecado);
document.addEventListener("DOMContentLoaded", preencherTabela);