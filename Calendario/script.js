const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

const calendario = document.querySelector(".calendario");
const mesAnio = document.getElementById("mes-anio");
const dias = document.querySelector(".dias");

let fechaActual = new Date();

function renderCalendario() {
    mesAnio.textContent = `${meses[fechaActual.getMonth()]} ${fechaActual.getFullYear()}`;
    dias.innerHTML = "";

    const primerDia = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
    const ultimoDia = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);

    for (let i = 0; i < primerDia.getDay(); i++) {
        const espacio = document.createElement("div");
        dias.appendChild(espacio);
    }

    for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
        const diaDiv = document.createElement("div");
        diaDiv.textContent = dia;
        diaDiv.classList.add("dia");
        if (diasSemana[primerDia.getDay()] === "Domingo") {
            diaDiv.classList.add("domingo"); 
        }
        diaDiv.addEventListener("click", () => alert(`Hiciste clic en el ${dia} de ${meses[fechaActual.getMonth()]}`));
        dias.appendChild(diaDiv);
        primerDia.setDate(primerDia.getDate() + 1);
    }
}

function mesAnterior() {
    fechaActual.setMonth(fechaActual.getMonth() - 1);
    renderCalendario();
}

function mesSiguiente() {
    fechaActual.setMonth(fechaActual.getMonth() + 1);
    renderCalendario();
}

document.getElementById("anterior").addEventListener("click", mesAnterior);
document.getElementById("siguiente").addEventListener("click", mesSiguiente);

renderCalendario();
