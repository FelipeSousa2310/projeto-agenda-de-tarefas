const parametro = new URLSearchParams(window.location.search);
const guardarDados = document.querySelector('#guardar');
//variável que vai criar as listas
const lista = document.querySelector('#lista');

//variável que pegar as entradas de dados
const campoTarefa = document.querySelector('#entrada');

//variável ue vai mostrar o dia selecionado.
const data = document.querySelector('#data');

const mesesAno = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro','dezembro'];

const numeroDia = parametro.get('dia');
const mesAtual = parametro.get('mes');
const anoAtual = parametro.get('ano');

//para selecionar as prioridades
const selecionarPrioridade = document.querySelector('.prioridade')

let chave = `${numeroDia}-${mesAtual}-${anoAtual}`;

//console.log(chave);

data.innerHTML = `${numeroDia} de ${mesesAno[mesAtual]} de ${anoAtual}`;

guardarDados.addEventListener('click', function(){

    //variável que pegar as entradas de dados
    let textoTarefa = campoTarefa.value;

    //variável que pega as entradas de dados
   // const input = document.querySelector('#entrada').value;

    if(textoTarefa.trim() === '') {
        return;
    }

    //para deixar a primeira letra maiúscula e retirar os espaços.
    textoTarefa = textoTarefa.trim();
    textoTarefa = textoTarefa[0].toUpperCase() + textoTarefa.slice(1);
    
    //variável que vai armazena os dados pegos pelo input
    let tarefas = JSON.parse(localStorage.getItem(chave)) || [];

    tarefas.push({
       titulo: textoTarefa,
       concluida: false,
       prioridade: selecionarPrioridade.value
        });

    localStorage.setItem(chave, JSON.stringify(tarefas));

    campoTarefa.value = '';

    mostrarTarefas();

    //console.log('Clicou')
});

function mostrarTarefas(){

    lista.innerHTML = '';

    let tarefas = JSON.parse(localStorage.getItem(chave)) || [];

    //esse aqui cria a lista crua, sem exclusão ou edição
    /*tarefas.forEach(function(tarefa){
        
        lista.innerHTML += `<li>${tarefa}</li>`;

    });*/

    //aqui já tem o botão de exclusão 
    tarefas.forEach(function(tarefa, index){

        let classeConcluida = tarefa.concluida ? 'concluida' : '';  
        
        let prioridade = tarefa.prioridade || 'baixa';
        
        lista.innerHTML += `

            <li id="tarefa-${index}">
             <span class="tag ${prioridade}">
                ${prioridade[0].toUpperCase() + prioridade.slice(1)}
             </span>

              <span  class="${classeConcluida}"> 
                ${tarefa.titulo}
              </span>

                <button onclick="excluirTarefa(${index})">
                    Excluir
                </button>

                <button onclick="editarTarefa(${index})">
                    Editar
                </button>

                <button onclick="concluirTarefa(${index})">
                    Concluído
                </button>
            </li> 
        `;

    });

};

function concluirTarefa(index){

    let tarefas = JSON.parse(localStorage.getItem(chave)) || [];

    tarefas[index].concluida = !tarefas[index].concluida;

    localStorage.setItem(chave, JSON.stringify(tarefas));

    mostrarTarefas();

}

function excluirTarefa(index){

    let tarefas = JSON.parse(localStorage.getItem(chave)) || [];

    tarefas.splice(index, 1);

    localStorage.setItem(chave, JSON.stringify(tarefas));

    mostrarTarefas();

}

function salvarEdiçao(index){

    let tarefas = JSON.parse(localStorage.getItem(chave)) || [];

    let editar = document.querySelector('.input-ediçao');

    let novaTarefa = editar.value;

    //aqui era necessário com o prompt pq poderia voltar um valor null.
    /*if(novaTarefa === null) {
        return;
    };*/

    //textoTarefa = textoTarefa[0].toUpperCase() + textoTarefa.slice(1);

    if(novaTarefa === ''){
        return;
    }

    novaTarefa = novaTarefa.trim();
    novaTarefa = novaTarefa[0].toUpperCase() + novaTarefa.slice(1);

    tarefas[index].titulo = novaTarefa;

    localStorage.setItem(chave, JSON.stringify(tarefas));

    mostrarTarefas();

}

function editarTarefa(index){

    let tarefas = JSON.parse(localStorage.getItem(chave)) || [];

    let li = document.querySelector(`#tarefa-${index}`);

    li.innerHTML =  `<input class="input-ediçao" type="text" value="${tarefas[index].titulo}">
                    <button onclick="salvarEdiçao(${index})"> Salvar </button>
                    ` ;
}

mostrarTarefas();

