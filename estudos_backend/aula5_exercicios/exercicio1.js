// Exercício 1 — Simulador de Atendimento
class Queue {
	constructor() {
		this.array = new Array();
		this.inicio = 0;
		this.final = 0;
		this.tamanho = 0;
	}

	enqueue(value) {
		this.array[this.final] = value;
		this.final = this.final + 1;
		this.tamanho = this.tamanho + 1;
	}

    //caso tamanho === 0 vai retornar fila vazia se não vai remover o primeiro valor da fila
	dequeue() {
		if (this.tamanho === 0) return 'fila vazia';
		const removido = this.array[this.inicio];
		this.array[this.inicio] = undefined;
		this.inicio = this.inicio + 1;
		this.tamanho = this.tamanho - 1;
		return removido;
	}

    //retorna o primeiro valor da fila
	peek() {
		return this.array[this.inicio];
	}

    //apenas mostra o tamanho da fila
	mostrarTamanho() {
		return this.tamanho;
	}

    //verifica se a fila ta vazia retornando true ou false
	isEmpty() {
		return this.tamanho === 0;
	}
}

const fila = new Queue();

//adiciona pessoas na fila
fila.enqueue('Emily');
fila.enqueue('Alice');
fila.enqueue('Emilie');

//tira as pessoas da fila, deixando vazia
console.log(fila.dequeue());
console.log(fila.dequeue());
console.log(fila.dequeue());
console.log(fila.dequeue());

//retorna 0 pq não tem ngm na fila
console.log(fila.mostrarTamanho());

//retorna true, está vazia

console.log(fila.isEmpty());

//adiciona pessoa
fila.enqueue('Emilie');

//agora retorna 1
console.log(fila.mostrarTamanho());

//retorna 'Emilie'
console.log(fila.peek());

//retorna false, não está vazia
console.log(fila.isEmpty());
