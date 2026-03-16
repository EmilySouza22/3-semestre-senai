//Exercício 7 - Lista com Ponteiro Tail
//Adicione ponteiro para último elemento.
 
class Node {
  constructor(valor) {
    this.valor = valor;
    this.proximo = null;
  }
}
 
class Lista {
  constructor() {
    this.primeiro = null;
    this.ultimo = null;
  }
 
  // Adicionar no final 
  adicionar(valor) {
    const novoNode = new Node(valor);
 
    if (this.primeiro === null) {
      this.primeiro = novoNode;
      this.ultimo = novoNode;
    } else {
      this.ultimo.proximo = novoNode;
      this.ultimo = novoNode;
    }
  }
 
  // mostrar a lista
  mostrar() {
    let texto = "";
    let atual = this.primeiro;
 
    while (atual !== null) {
      texto += atual.valor + " -> ";
      atual = atual.proximo;
    }
    texto += "FIM";
 
    console.log(texto);
  }
 
  // Obter o primeiro valor
  getPrimeiro() {
    if (this.primeiro === null) {
      return "Lista vazia!";
    }
    return this.primeiro.valor;
  }
 
  // Obter o último valor do tail
  getUltimo() {
    if (this.ultimo === null) {
      return "Lista vazia!";
    }
    return this.ultimo.valor;
  }
}
 
// ttestando
 
console.log("Criando lista...\n");
const lista = new Lista();
 
console.log("Adicionando: 10, 20, 30\n");
lista.adicionar(10);
lista.adicionar(20);
lista.adicionar(30);
 
console.log("Lista atual:");
lista.mostrar();
 
console.log("\nPrimeiro elemento:", lista.getPrimeiro());
console.log("Último elemento:", lista.getUltimo());
 
console.log("\n---\n");
 
console.log("Adicionando: 40, 50\n");
lista.adicionar(40);
lista.adicionar(50);
 
console.log("Lista atual:");
lista.mostrar();
 
console.log("\nPrimeiro elemento:", lista.getPrimeiro());
console.log("Último elemento:", lista.getUltimo());