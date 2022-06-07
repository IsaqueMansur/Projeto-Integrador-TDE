export default class Eventos {
    init() {
        try {
          this.carousel();
        }catch(e) {}

        try {
            this.eventosLogin();
          }catch(e) {}
           
        try {
          if (document.querySelector("#formCriaNoticia")) this.publicacao();         
        } catch(e) {} 
        
        try {
          this.identificaValoresCarrossel();
        } catch(e) {}
    }
    carousel() {
      "use strict";
      let carouselSlider = document.querySelector(".carousel__slider");
      let list = document.querySelector(".carousel__list");
      let item = document.querySelectorAll(".carousel__item");
      let tamanho = 0;

      for (let i in item) {
        if (item[i].offsetWidth) {
          tamanho += item[i].offsetWidth;
        };     
      }
      let list2;
    
      const speed = .5;
    
      const width = tamanho;
      let x = 0;
      let x2 = width;
    
      function clone() {
        list2 = list.cloneNode(true);
        carouselSlider.appendChild(list2);
        list2.style.left = `${width}px`;
      }
    
      function moveFirst() {
        x -= speed;
    
        if (width >= Math.abs(x)) {
          list.style.left = `${x}px`;
        } else {
          x = width;
        }
      }
    
      function moveSecond() {
        x2 -= speed;
    
        if (tamanho >= Math.abs(x2)) {
          list2.style.left = `${x2}px`;
        } else {
          x2 = width;
        }
      }
    
      function hover() {
        clearInterval(a);
        clearInterval(b);
      }
    
      function unhover() {
        a = setInterval(moveFirst, 10);
        b = setInterval(moveSecond, 10);
      }
     
      clone();
        
    
      let a = setInterval(moveFirst, 10);
      let b = setInterval(moveSecond, 10);
    
      carouselSlider.addEventListener("mouseenter", hover);
      carouselSlider.addEventListener("mouseleave", unhover);
    }

      eventosLogin() {
        const body = document.querySelector('body');
        body.className = "sign-in-js";
        let btnSignin = document.querySelector("#signin");
        let btnSignup = document.querySelector("#signup");

        btnSignin.addEventListener("click", function () {
           body.className = "sign-in-js"; 
        });

        btnSignup.addEventListener("click", function () {
            body.className = "sign-up-js";
        }); 
    }

    publicacao() {
      document.querySelector("#infoFlex").textContent = "Retornar";
      document.querySelector("#infoFlex").href = "/";
      document.querySelector(".d-flex").remove();
      document.querySelector("#cadastroColunista").remove();
      this.eventosPreRender();
    }
    eventosPreRender() {
      const tituloPreRender = document.querySelector(".titlePreRender");
      const subtituloPreRender = document.querySelector(".subtitlePreRender");
      const imgPreRender = document.querySelector(".imgPreRender");
      const textPreRender = document.querySelector(".textPreRender");
      document.querySelector("#formCriaNoticia").addEventListener('keyup', e => {
        const target = e.target;
        if (target.classList[1] == "titleNotice") {
          tituloPreRender.textContent = target.value;
        }
        if (target.classList[1] == "subtitleNotice") {
          subtituloPreRender.textContent = target.value;  
        }
        if (target.classList[1] == "imgNotice") {
          imgPreRender.src = target.value;
        }
        if (target.classList[1] == "textNotice") {
          textPreRender.textContent = target.value;
        }        
      } )
    }

    identificaValoresCarrossel() {
      const listaValores = document.querySelectorAll(".money");
        for (let i in listaValores) {
          let num = String(listaValores[i].textContent.replace(/\D/g, ','));
          num = num.slice(2, 200).split(",", 200);
          num = Number(parseFloat(`${num[0]}.${num[1]}`).toFixed(2));
          this.novoValorCarrossel(listaValores[i], num);
        };
      };
    novoValorCarrossel(item, num) {
      let fator = parseInt(Math.random() * 1000);
      fator = `1.0${fator}`; 
      const novoNumero = Number(num * fator).toFixed(2);
      let pctagem = (novoNumero - num);
      pctagem = ((pctagem * 100) / num);
      item.textContent = `R$${novoNumero}`;
    };
}     
