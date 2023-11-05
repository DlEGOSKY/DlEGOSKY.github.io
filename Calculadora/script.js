document.addEventListener("DOMContentLoaded", function () {
    const pantallaHistorial = document.querySelector(".historial");
    const pantallaResultado = document.querySelector(".resultado");
    const botones = document.querySelectorAll("button");
  
    let historial = "";
    let resultado = "";
    let operadorSeleccionado = false;
  
    botones.forEach((button) => {
      button.addEventListener("click", function () {
        const valor = button.textContent;
  
        if (isNumero(valor)) {
          if (operadorSeleccionado) {
            resultado = valor;
            operadorSeleccionado = false;
          } else {
            resultado += valor;
          }
        } else if (isOperador(valor)) {
          if (!operadorSeleccionado) {
            historial += resultado + valor;
            operadorSeleccionado = true;
          }
        } else if (valor === "=") {
          historial += resultado;
          resultado = eval(historial).toString();
          historial = "";
        } else if (valor === "C") {
          historial = "";
          resultado = "";
        }
  
        pantallaHistorial.textContent = historial;
        pantallaResultado.textContent = resultado;
      });
    });
  
    function isNumero(valor) {
      return !isNaN(valor) || valor === ".";
    }
  
    function isOperador(valor) {
      return ["+", "-", "*", "/"].includes(valor);
    }
  });
  