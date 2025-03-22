class Tasca {
    static totalTasques = 0;
    
    constructor(nom, prioritat = 1, tipus = "normal") {
        this.id = Tasca.totalTasques + 1;
        this.nom = nom;
        this.completada = false;
        this.prioritat = prioritat;
        this.tipus = tipus;
        Tasca.totalTasques++;
    }

    set completada(value) {
        this._completada = value;
    }

    get completada() {
        return this._completada;
    }

    estaCompletada() {
        return this.completada;
    }

    mostrarInfoTasca() {
        return `${this.nom} - Tipus: ${this.tipus}, Prioritat: ${this.prioritat}, Completada: ${this.completada}`;
    }

    static obtenirTotalTasques() {
        return Tasca.totalTasques;
    }
}


class Critica extends Tasca {
    constructor(nom, dataLimit, descripcio) {
        super(nom, 3, "critica");
        this.dataLimit = dataLimit;
        this.descripcio = descripcio;
    }

    mostrarInfoTasca() {
        return `${super.mostrarInfoTasca()}, Data límit: ${this.dataLimit}, Descripció: ${this.descripcio}`;
    }
}


class Urgent extends Tasca {
    constructor(nom, recordatori) {
        super(nom, 2, "urgent");
        this.recordatori = recordatori;
    }

    mostrarInfoTasca() {
        return `${super.mostrarInfoTasca()}, Recordatori: ${this.recordatori}`;
    }
}


class App {
    constructor() {
        this.tasques = [];
    }

    afegirTasca(novaTasca) {
        this.tasques.push(novaTasca);
        this.actualitzarLlista();
    }

    completarTasca(id) {
        let tasca = this.tasques.find(t => t.id === id);
        if (tasca) tasca.completada = true;
        this.actualitzarLlista();
    }

    eliminarTasca(id) {
        this.tasques = this.tasques.filter(t => t.id !== id);
        this.actualitzarLlista();
    }

    modificaNomTasca(id, nom) {
        let tasca = this.tasques.find(t => t.id === id);
        if (tasca) tasca.nom = nom;
        this.actualitzarLlista();
    }

    actualitzarLlista() {
        const llista = document.getElementById("taskList");
        llista.innerHTML = "";
        this.tasques.forEach(tasca => {
            const li = document.createElement("li");
            li.textContent = tasca.mostrarInfoTasca();
            li.classList.toggle("completed", tasca.completada);
            llista.appendChild(li);
        });

        document.getElementById("taskCount").textContent = this.tasques.length;
    }
}


const gestorTasques = new App();


document.getElementById("addTask").addEventListener("click", () => {
    const nom = document.getElementById("taskName").value;
    const tipus = document.getElementById("taskType").value;
    let novaTasca;

    if (tipus === "critica") {
        novaTasca = new Critica(nom, "2025-12-31", "Urgent!!!!!!");
    } else if (tipus === "urgent") {
        novaTasca = new Urgent(nom, "Recorda fer-ho!!!!!!!!!!!");
    } else {
        novaTasca = new Tasca(nom, 1, "normal");
    }

    gestorTasques.afegirTasca(novaTasca);
});

