class Nodo {
    constructor(value) {
        this.value = value
        this.next = null
    }
}

class ListaEncadeada {
    constructor() {
        this.ponteiro = null
    }

    inserirNoInicio(value) {
        const nodo = new Nodo(value)
        nodo.next = this.ponteiro
        this.ponteiro = nodo
    }

    inserirNoFinal(value) {
        const nodo = new Nodo(value)
        if (!this.ponteiro) {
            this.ponteiro = nodo;
            return
        }
        let atual = this.ponteiro
        while (atual.next) {
            atual = atual.next
        }
        atual.next = nodo
    }
    removerValor(valor) {
        if (!this.ponteiro) return "Lista vazia"
        if (this.ponteiro.value == valor) {
            this.ponteiro = this.ponteiro.next
            return "Removido"
        }

        let atual = this.ponteiro;
        let proximo = this.ponteiro.next

        while (proximo) {
            if (proximo.value == valor) {
                atual.next = proximo.next
                return "Removido"
            }

            atual = proximo
            proximo = proximo.next
        }
        return "Valor nao encontrado na lista"

    }
    mostrar() {
        const output = []
        let atual = this.ponteiro
        while (atual) {
            output.push(atual.value)
            atual = atual.next
        }
        return output
    }
}

const listaEncadeada = new ListaEncadeada()

listaEncadeada.inserirNoInicio(4)
listaEncadeada.inserirNoInicio(5)
listaEncadeada.inserirNoInicio(6)
listaEncadeada.inserirNoFinal(3)
listaEncadeada.inserirNoFinal(2)
listaEncadeada.inserirNoFinal(1)
console.log(listaEncadeada.mostrar())
console.log(listaEncadeada.removerValor(5))
console.log(listaEncadeada.mostrar())
