//para os dias passados
const hoje = new Date();
hoje.setHours(0,0,0,0);

//mostra os dias da semana no mês
const dias = document.querySelector('.numeros-semana');
const meses = document.querySelector('.meses');
const painel = document.querySelector('.painel');

//botoes do input
const inputTitulo = document.querySelector('.titulo');
/*const textareaDescriçao = document.querySelector('.descriçao');*/

const botaoSalvar = document.querySelector('.salvar');

//let dataSelecionada = '';

const mesesAno = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro','dezembro'];

//let data = new Date();

let mesAtual = new Date().getMonth();
let anoAtual = new Date().getFullYear();

//objeto para armazenar as informações do calendário
const tarefas = {};

document.querySelector('.botao-esquerda').addEventListener('click', mesAnterior);
document.querySelector('.botao-direita').addEventListener('click', proximoMes);


function mostrarCalendario(){

   // dias.innerHTML = '';
    let html = '';

    let primeiroDia = new Date(anoAtual, mesAtual, 1).getDay();

    primeiroDia = primeiroDia === 0 ? 6 : primeiroDia - 1;

    let totalDias = new Date(anoAtual, mesAtual + 1, 0).getDate();

    for(let j = 0; j < primeiroDia; j++){
        html += `<div class="vazio"></div>`;
    }

    for(let i = 1; i <= totalDias; i++){

        let chave = `${i}-${mesAtual}-${anoAtual}`;

        const diaCalendario = new Date(anoAtual, mesAtual, i);

        diaCalendario.setHours(0,0,0,0);

        let tarefasSalvas = JSON.parse(localStorage.getItem(chave)) || [];

        let temTarefas = tarefasSalvas.length > 0;

        let classeHoje = ''
        let classePassado = '';

        if( diaCalendario < hoje){
                classePassado = 'dia-passado';
        }

        if(i === hoje.getDate() && mesAtual === hoje.getMonth() && anoAtual === hoje.getFullYear()){
            classeHoje = 'dia-atual';
        }

        html += `<span class="dia ${temTarefas ? 'tem-tarefa' : ''} ${classePassado} ${classeHoje}" 
                data-dia="${i}">
                ${i}
                </span>`;

    }

    dias.innerHTML = html;

    //função que vai selecionar o dia ao clicar.
    const todosDias = document.querySelectorAll('.dia');

    todosDias.forEach((dia) => {

        dia.addEventListener('click', function(){

           /* painel.style.display = 'flex';*/
            
            let numeroDia = dia.dataset.dia;
            
            window.location.href = `tarefa.html?dia=${numeroDia}&mes=${mesAtual}&ano=${anoAtual}`;

            /*let chave*/

            //dataSelecionada = `${numeroDia} - ${mesAtual + 1} - ${anoAtual}`;

            /*let anotaçao = prompt(`Está agendado para o dia ${numeroDia}`);*/

                /*tarefas[chave] = anotaçao;*/
                
            }
        )
    });

    //aqui vai mostrar os meses do caledário 
    meses.innerHTML = mesesAno[mesAtual].toUpperCase() + ' ' + anoAtual;
}

    botaoSalvar.addEventListener('click', function(){

        if(dataSelecionada === '') return;

        tarefas[dataSelecionada] = {
                    titulo: inputTitulo.value
                   /* descriçao: textareaDescriçao.value*/
                };
                
                console.log(tarefas);

                inputTitulo.value = '';
                /*textareaDescriçao.value = '';*/

                painel.style.display = 'none';

    });

function proximoMes(){

    mesAtual++;

    if(mesAtual > 11){
        mesAtual = 0;
        anoAtual++;
    }

    mostrarCalendario();
    
}

function mesAnterior(){

    mesAtual--;

    if(mesAtual < 0){
        mesAtual = 11;
        anoAtual--;
    }
    mostrarCalendario();

}

mostrarCalendario();





