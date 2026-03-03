// Exercício 2 — Fila com Prioridade Simples

class Queue{

    constructor(){
        this.array = new Array();
        this.inicio = 0;
        this.final = 0;
        this.tamanho = 0;
    }

    enqueue(value){
        if(value.isElderly){
            let contador = 0
                while(contador < this.array.length){
                    if(this.array[contador] && this.array[contador].isElderly) {
                        contador++
                    } else {
                        break
                    }
                } 
                this.array.splice(contador, 0 , value)
            }else{
            this.array.push(value)
        }

        this.tamanho++;
    }

    dequeue() {
		if (this.tamanho === 0) return 'fila vazia';
		const removido = this.array[this.inicio];
		this.array[this.inicio] = undefined;
		this.inicio = this.inicio + 1;
		this.tamanho = this.tamanho - 1;
		return removido;
	}

    peek() {
		return this.array[this.inicio];
	}

    mostrarTamanho() {
		return this.tamanho;
	}

	isEmpty() {
		return this.tamanho === 0;
	}
}
