import { carregarCenario } from "./Tela.js";
import { inimigo, setInimigo,startGame} from "./jsons/Jogo/Jogo.js"
import { inimigos } from "./jsons/inimigos/Inimigos.js";
import { pararAudio, tocarTema } from "./Sons.js";
export function criarFase(){
    console.log("main")
    let main = document.createElement('main')
    main.id='main'


    
    let vidainimigoCtn = document.createElement("div")
    vidainimigoCtn.id="alegriaInimigo"

    const vidaInimigo = document.createElement('div');
    vidaInimigo.classList.add("vidaInimigo");
    vidaInimigo.id="vidaInimigo";
    vidainimigoCtn.appendChild(vidaInimigo)
    main.appendChild(vidainimigoCtn)

    let vidaSuaCtn = document.createElement("div")
    vidaSuaCtn.id="alegriaSua"

    let vidaJogador= document.createElement("div")
    vidaJogador.classList.add("vidaJogador");
    vidaJogador.id="vidaJogador";
    vidaSuaCtn.appendChild(vidaJogador)

    main.appendChild(vidaSuaCtn)

    let mesa = document.createElement('div')
    let inimigo = document.createElement('div')
    inimigo.id="inimigo"
    mesa.id="mesaCartas"
    
    main.appendChild(mesa)
    main.appendChild(inimigo)

    
    document.body.appendChild(main)
    

}
export function criarMapa(){

    let main = document.querySelector("#body")


    main.innerHTML = "";    

    var mapa = document.createElement("div");   
    mapa.classList.add("mapa");
    let voltar = document.createElement("button");
    voltar.innerHTML = "&#10132;";
    mapa.appendChild(voltar);
    voltar.onclick = function(){
        let a = document.createElement('a')
        a.href="index.html"
        a.click()
    }
    let centralizador = document.createElement('div')
    centralizador.classList.add("centralizador")
    for (let i = 0; i <4; i++) {    
        const moldura = document.createElement("div");
        let h3 = document.createElement("h3")
        h3.textContent = inimigos[i].nome
        moldura.appendChild(h3)
        moldura.classList.add("molduarPersonagem");

        
        moldura.classList.add("a"+i);
    
        moldura.addEventListener("click", function(){


           if(inimigos[i].derrotado == true){return}
           tocarTema(inimigos[i].nome);
            main.innerHTML = "";
            criarFase()
            setInimigo(inimigos[i])
            startGame()
            carregarCenario()

        })
        if(inimigos[i].derrotado == true){
            moldura.classList.add("fechada");
        }
        centralizador.appendChild(moldura);
    }

    mapa.appendChild(centralizador);
    document.body.appendChild(mapa);

    console.log("mapa criado");
}