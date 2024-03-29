
import {pegarCarta} from './Carta.js';
import CARTAS from './jsons/carta.js'
import { getJogador, setVida } from './Jogador.js';
import { cicloJogo,inimigo    } from './jsons/Jogo/Jogo.js';
import { criarMapa } from './mapa.js';
import { pararAudio } from './Sons.js';

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
           // carta.dados.descricao = carta.dados.descricao[randomNumberInterval(0,carta.dados.descricao.length-1)]

            let desc = carta.dados.descricao[randomNumberInterval(0,carta.dados.descricao.length-1)]
            descricaoCtn.textContent = desc
            
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
    
    const barraJogador = document.querySelector('#vidaJogador');

    
    
    const barra = document.querySelector('#vidaInimigo');

    function preencherBarra(barra, valor, path1,path2){
        barra.innerHTML = '';
        for (let i = 0; i < valor; i++) {
            const img = document.createElement('div');
            img.style.backgroundImage = path1
           
            img.classList.add('heart');
            barra.appendChild(img);
        }
        for (let i = 0; i < 10-valor; i++) {
            const img = document.createElement('div');
            img.style.backgroundImage = path2 
           

            img.classList.add('heart');
            barra.appendChild(img);
        }
        
    }

    preencherBarra(barraJogador, jogador.vida,'URL(./assets/coração.png)','URL(./assets/coraçãoVazio.png)');


    
    preencherBarra(barra, inimigo.graca,'URL(./assets/feliz.png)','URL(./assets/vazio.png)');
  
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

    main.style.backgroundImage = `url(./${inimigo.cenario})`

    let inimigoCtn = document.querySelector("#inimigo")
    inimigoCtn.style.gridArea= inimigo.area.x1+'/'+inimigo.area.x2+'/'+inimigo.area.x3+'/'+inimigo.area.x4
    inimigoCtn.dataset.frame = inimigo.frame
    inimigoCtn.classList.add(inimigo.nome);

    let nome = inimigo.nome
    if (!inimigo.heartbeat) {
        inimigo.heartbeat = setInterval(() => {
            console.log(inimigo.frame);
            inimigo.frame = inimigo.frame >=3 ? 0 : inimigo.frame+1;
            inimigoCtn.dataset.frame = inimigo.frame
        }, 150);

    }else{
        clearInterval(inimigo.heartbeat)
        inimigo.heartbeat = null
    }

  

    //FIXME back.appendChild(div)
}

export function mostrarFrase(texto){
    const altura = inimigo.bottom

    let inimigoCtn = document.querySelector("#inimigo")
    inimigoCtn.innerHTML=''
    
    let frase = document.createElement('h3')
    console.log(altura)
    frase.style.bottom=altura+'px'

    frase.textContent=texto
    inimigoCtn.appendChild(frase)

    window.setTimeout(()=>{ 
        inimigoCtn.removeChild(frase)
    },1000)
}

export function imprimeResultado( resultado){
    let main = document.querySelector("#main")

    let div= document.createElement('div')
    div.classList.add('resultado')
    if (resultado == 'Vitoria'){
        let h1 = document.createElement('h1')
        h1.textContent= "Muito bem!";
        let button=document.createElement('button')

        button.textContent="Menu"
        button.onclick=()=>{
        pararAudio()
        criarMapa()
        setVida(10)
        }    
        div.appendChild(button)
        div.appendChild(h1)
        main.appendChild(div)
        return;
    }
    let h1 = document.createElement('h1')
    h1.textContent= "Esperava mais!";
    let button=document.createElement('button')

    button.textContent="Reiniciar"
    button.addEventListener('click', ()=>{
        let a = document.createElement('a')
        a.href="index.html"
        a.click()
    });
    div.appendChild(button)
    div.appendChild(h1)
    main.appendChild(div);
   }