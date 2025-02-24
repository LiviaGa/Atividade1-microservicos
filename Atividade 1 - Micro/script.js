let dadosOriginais = []

function validarFormulario() {
  let valido = true

  const nome = document.getElementById('nome').value.trim()
  const email = document.getElementById('email').value.trim()
  const idade = document.getElementById('idade').value.trim()

  if (nome === '') {
    document.getElementById('erroNome').textContent = 'Nome é obrigatório.'
    valido = false
  }

  if (email === '') {
    document.getElementById('erroEmail').textContent = 'E-mail é obrigatório.'
    valido = false
  }

  if (idade === '') {
    document.getElementById('erroIdade').textContent = 'Idade é obrigatória.'
    valido = false
  }

  return valido
}

function enviarFormulario(event) {
  event.preventDefault()

  if (validarFormulario()) {
    const novoCliente = {
      nome: document.getElementById('nome').value.trim(),
      email: document.getElementById('email').value.trim(),
      idade: parseInt(document.getElementById('idade').value.trim())
    }

    fetch('http://demo9516306.mockable.io/respostaApi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(novoCliente)
    })
      .then(response => response.json())
      .then(data => {
        alert('Cliente adicionado com sucesso!')
        document.getElementById('formularioArtista').reset()
      })
      .catch(error => {
        console.error('Erro:', error)
        alert('Erro ao adicionar cliente.')
      })
  }
}

document
  .getElementById('formularioArtista')
  .addEventListener('submit', enviarFormulario)

function adicionarItem() {
  const lista = document.getElementById('musicas-populares')
  const novaMusicaInput = document.getElementById('novaMusica')
  const novaMusica = novaMusicaInput.value.trim()

  if (novaMusica !== '') {
    const li = document.createElement('li')
    li.innerHTML = `${novaMusica} <span class="remover"></span>`
    li.ondblclick = function () {
      removerItem(li)
    }
    lista.appendChild(li)
    novaMusicaInput.value = ''
    novaMusicaInput.focus()
  }
}

function removerItem(elemento) {
  if (confirm('Tem certeza que deseja remover esta música?')) {
    elemento.remove()
  }
}

function consumirApi() {
  fetch('http://demo9516306.mockable.io/clientes')
    .then(response => response.json())
    .then(data => {
      dadosOriginais = data
      exibirMensagem('Dados carregados com sucesso!')
      preencherTabela(data)
    })
    .catch(error => {
      console.error('Erro:', error)
      exibirMensagem('Erro ao carregar os dados da API.')
    })
}

function exibirMensagem(mensagem) {
  const mensagemDiv = document.getElementById('mensagemApi')
  mensagemDiv.textContent = mensagem
}

function preencherTabela(dados) {
  const tabela = document
    .getElementById('tabelaDados')
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

    const celulaIdade = document.createElement('td')
    celulaIdade.textContent = item.idade
    linha.appendChild(celulaIdade)

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
    exibirMensagem('Item atualizado com sucesso!')
  }
}

function excluirItem(index) {
  if (confirm('Tem certeza que deseja excluir este item?')) {
    dadosOriginais.splice(index, 1)
    preencherTabela(dadosOriginais)
    exibirMensagem('Item excluído com sucesso!')
  }
}

function filtrarDados() {
  const dadosFiltrados = dadosOriginais.filter(item => item.idade > 31)
  preencherTabela(dadosFiltrados)
  exibirMensagem('Dados filtrados (idade > 31).')
}

function resetarFiltro() {
  preencherTabela(dadosOriginais)
  exibirMensagem('Filtro resetado. Exibindo todos os dados.')
}

document
  .getElementById('botaoAdicionar')
  .addEventListener('click', adicionarItem)
