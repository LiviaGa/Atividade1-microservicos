let dadosOriginais = []

function validarFormulario() {
  let valido = true

  const nome = document.getElementById('nome').value.trim()
  const email = document.getElementById('email').value.trim()
  const curso = document.getElementById('curso').value.trim()

  if (nome === '') {
    document.getElementById('erroNome').textContent = 'Nome é obrigatório.'
    valido = false
  } else {
    document.getElementById('erroNome').textContent = ''
  }

  if (email === '') {
    document.getElementById('erroEmail').textContent = 'E-mail é obrigatório.'
    valido = false
  } else {
    document.getElementById('erroEmail').textContent = ''
  }

  if (curso === '') {
    document.getElementById('erroCurso').textContent = 'Curso é obrigatório.'
    valido = false
  } else {
    document.getElementById('erroCurso').textContent = ''
  }

  return valido
}

function adicionarAluno() {
  if (validarFormulario()) {
    const novoAluno = {
      nome: document.getElementById('nome').value.trim(),
      email: document.getElementById('email').value.trim(),
      curso: document.getElementById('curso').value.trim()
    }

    dadosOriginais.push(novoAluno)
    preencherTabela(dadosOriginais)
    document.getElementById('nome').value = ''
    document.getElementById('email').value = ''
    document.getElementById('curso').value = ''
  }
}

function preencherTabela(dados) {
  const tabela = document
    .getElementById('tabelaAlunos')
    .getElementsByTagName('tbody')[0]
  tabela.innerHTML = ''

  dados.forEach((item, index) => {
    const linha = document.createElement('tr')

    const celulaNome = document.createElement('td')
    celulaNome.textContent = item.nome
    linha.appendChild(celulaNome)

    const celulaEmail = document.createElement('td')
    celulaEmail.textContent = item.email
    linha.appendChild(celulaEmail)

    const celulaCurso = document.createElement('td')
    celulaCurso.textContent = item.curso
    linha.appendChild(celulaCurso)

    const celulaAcoes = document.createElement('td')
    celulaAcoes.className = 'acoes'

    const botaoEditar = document.createElement('button')
    botaoEditar.textContent = 'Editar'
    botaoEditar.onclick = () => editarItem(index)
    celulaAcoes.appendChild(botaoEditar)

    const botaoExcluir = document.createElement('button')
    botaoExcluir.textContent = 'Excluir'
    botaoExcluir.onclick = () => excluirItem(index)
    celulaAcoes.appendChild(botaoExcluir)

    linha.appendChild(celulaAcoes)
    tabela.appendChild(linha)
  })
}

function editarItem(index) {
  const novoNome = prompt('Digite o novo nome:')
  if (novoNome !== null && novoNome.trim() !== '') {
    dadosOriginais[index].nome = novoNome.trim()
    preencherTabela(dadosOriginais)
  }
}

function excluirItem(index) {
  if (confirm('Tem certeza que deseja excluir este aluno?')) {
    dadosOriginais.splice(index, 1)
    preencherTabela(dadosOriginais)
  }
}
