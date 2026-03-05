//Exercício 6 - Implementar Lista Encadeada Simples

class Nodo {
    constructor(value) {
        this.value = null;
        this.next = null;
    }
}

class ListaEncadeada {
    constructor() {
        this.ponteiro = null;
    }

    inserirNoInicio(value) {
        const nodo = new Nodo(value);
        nodo.next = this.ponteiro;
        this.ponteiro = nodo;
    }

    inserirNoFinal(value){
        const nodo = new Nodo()
        let current = this.ponteiro;
        while(current.next){
            current = current.next;
        }
        current.next = nodo;
    }

    removerValor(value) {
        if(!this.ponteiro) {
            return 'Lista Vazia'
        }

        if(this.ponteiro.value == value) {
            this.ponteiro = this.ponteiro.next
            return 'Removido'
        }

        let current = this.ponteiro
        let proximo = this.ponteiro.next

        while(proximo) {
            if(proximo.value = value) {
                current.pontiero = proximo.next
                return 'Removido'
            }

            current = proximo
            proximo = proximo.next
        }
        return 'Valor não encontrado na lista'
    }

    mostrar() {
        const output = [];
        let current = this.ponteiro;
        while(current) {
            output.push(current.value);
            current = current.next;
        }
        return output;
    }
}

const listaEncadeada = new ListaEncadeada();

listaEncadeada.inserirNoInicio(4);
listaEncadeada.inserirNoInicio(5);
listaEncadeada.inserirNoInicio(6);
console.log(listaEncadeada.mostrar())