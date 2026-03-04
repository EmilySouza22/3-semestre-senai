//Fila com Prioridade Simples inserção constante

/** 
* enqueue = O(1)
* dequeue = O(1)
**/

//Para conseguir O(1) em tudo precisa-se implementar 2 filas separadas

class PriorityQueue {
    constructor() {
        this.idosos = [];
        this.comuns = [];
    }

    enqueue(value) {
        if(value.isElderly) {
            this.idosos.push(value);
        } else {
            this.comuns.push(value);
        }
    }

    dequeue(){
        if(this.idosos.length > 0){
            return this.idosos.shift()
        }
        return this.comuns.shift();
    }

    peek(){
        if(this.idosos.length > 0){
            return this.idosos[0];
        }
        return this.comuns[0];
    }

    isEmpty(){
        return this.idosos.length === 0 && this.comuns.length === 0;
    }
}

const filaPrioridade = new PriorityQueue();

filaPrioridade.enqueue({name: 'Emily', isElderly: false})
filaPrioridade.enqueue({name: 'João', isElderly: true})
filaPrioridade.enqueue({name: 'Maria', isElderly: false})
filaPrioridade.enqueue({name: 'Gabriel', isElderly: true})

console.log(filaPrioridade.dequeue())
console.log(filaPrioridade.dequeue())
console.log(filaPrioridade.dequeue())
console.log(filaPrioridade.dequeue())