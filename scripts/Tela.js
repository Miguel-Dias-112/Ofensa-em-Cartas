
import {pegarCarta} from './Carta.js';
import CARTAS from './jsons/carta.js'
import { getJogador } from './Jogador.js';
import { cicloJogo,inimigo    } from './jsons/Jogo/Jogo.js';
function randomNumberInterval(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a
}

function randomizarCartas(maodoJogador){
   
    const totalCarta = CARTAS.length; // tamanho de cartas do json
    let indexC1 
    let indexC2 
    do{
        indexC1 = randomNumberInterval(0,totalCarta-1);
        indexC2 = randomNumberInterval(0,totalCarta-1);
    }while(indexC1==indexC2)
    
    maodoJogador.push(pegarCarta(indexC1));
    maodoJogador.push(pegarCarta(indexC2));
}

function porCartaTela(cartas, missão){
    const mesaCartas = document.querySelector('#mesaCartas');
    mesaCartas.innerHTML = '';

    function criarContainerCarta(descricao,carta){
            let  cartaContainer = document.createElement('div');
            let descricaoCtn = document.createElement('p');

            cartaContainer.addEventListener('click', function(){
                
                //////CICLO JOGO
                cicloJogo(carta);
            });
            descricaoCtn.textContent = descricao
            cartaContainer.classList.add('carta');
            cartaContainer.classList.add('subindo');


            cartaContainer.appendChild(descricaoCtn);
            mesaCartas.appendChild(cartaContainer);

            window.setTimeout(()=>{
                cartaContainer.classList.remove('subindo')
                       // 
                cartaContainer.classList.add('nusada');

            },500)
    }
    
    cartas.forEach(carta => {
        criarContainerCarta(carta.dados.descricao,carta);
    });

}


export function PorDecknaTela(){
    let maodoJogador = getJogador().maodoJogador;
    
    getJogador().maodoJogador = [];
    randomizarCartas(maodoJogador);
    porCartaTela(maodoJogador);
    
}

export function atualizarValores(){
    const jogador = getJogador();
    
    const barraJogador = document.querySelector('#progressoAlegriaSua');
    const barraInimigo = document.querySelector('#progressoAlegriaInimigo');
    const heartContainerInimigo = document.querySelector('#heartContainerInimigo');
 
    barraInimigo.value = inimigo.graca;
    heartContainerInimigo.innerHTML = '';
    for (let i = 0; i < 10-inimigo.graca; i++) {
        const heart = document.createElement('div');


        heart.innerText = '😉';
        heart.classList.add('heart');
        heartContainerInimigo.appendChild(heart);
    }
    for (let i = 0; i < inimigo.graca; i++) {
        const heart = document.createElement('div');


        heart.innerText = '😊';
        heart.classList.add('heart');
        heartContainerInimigo.appendChild(heart);
    }

    barraJogador.value = jogador.vida;
}

export function animaCartasDescendo(){
    let cartas = document.querySelectorAll(".carta")
    cartas.forEach(carta => {
        carta.classList.remove("nusada")
        carta.classList.add("usada")
    });

}
export function carregarCenario(){
    let main = document.querySelector("#main")

    main.style.backgroundImage = `url(${inimigo.cenario})`

    let back = document.querySelector("#inimigo")
    back.style.gridArea= inimigo.area.x1+'/'+inimigo.area.x2+'/'+inimigo.area.x3+'/'+inimigo.area.x4
    console.log(inimigo.area)
    back.style.backgroundImage = `url(${inimigo.sprite})`


    //FIXME back.appendChild(div)
}