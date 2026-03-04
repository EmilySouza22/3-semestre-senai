// Exercício 2 — Fila com Prioridade

class Queue {
	constructor() {
		this.array = new Array();
		this.inicio = 0;
		this.final = 0;
		this.tamanho = 0;
	}

	enqueue(value) {
		if (value.isElderly) {
			let contador = 0;
			while (contador < this.array.length) {
				if (this.array[contador] && this.array[contador].isElderly) {
                    contador++;
				} else {
					break;
				}
			}
			this.array.splice(contador, 0, value);
		} else {
			this.array.push(value);
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

const queue = new Queue();

queue.enqueue({name: 'Emily', isElderly: false});
queue.enqueue({name: 'João', isElderly: true});
queue.enqueue({name: 'Maria', isElderly: false});
queue.enqueue({name: 'Gabriel', isElderly: true});

console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());


//Outra forma de Fila com prioridade
class PriorityQueue {
	constructor() {
        this.items = [];
    }

    //menor número = maior prioridade
    enqueue(value, priority) {
        const newItem = {value, priority}
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
            if (priority < this.items[i].priority) {
                this.items.splice(i, 0, newItem);
                added = true;
                break
            }
        }
        
        if(!added) {
            this.items.push(newItem)
        }

    }

    dequeue() {
        return this.items.shift();
    }

    peek() {
        return this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

const queue2 = new PriorityQueue();

queue2.enqueue('Low priority task', 5);
queue2.enqueue('High priority task', 1);
queue2.enqueue('Medium priority task', 3);

console.log(queue2.dequeue());
console.log(queue2.dequeue());
console.log(queue2.dequeue());