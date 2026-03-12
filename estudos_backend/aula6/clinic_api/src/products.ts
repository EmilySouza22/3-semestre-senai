//Desafio: Criar um sistema de gerenciamento de produtos e categorias em TypeScript

class Product {
    //Classe Produto: Criar com atributos como nome e preço.
    name: string;
    price: number;

    constructor(name: string, price: number){
        this.name = name;
        this.price = price;
    }

    exibirProduto(){
        console.log(`Name: ${this.name}, Price: ${this.price}`)
    }
}

class Category {
    //Classe Categoria: Criar para aplicar descontos aos produtos vinculados.
    nome: string;
    desconto: number;

    constructor(nome: string, desconto: number){
        this.nome = nome;
        this.desconto = desconto;
    }

    calcularDesconto(produto: Product) : number {
        return produto.price - (produto.price * (this.desconto/100))
    }
 
}

//Método de Desconto
//Implementar um método para calcular o preço final com desconto.

const short = new Product("short jeans", 100)
console.log("short", short)

const verao = new Category("verao", 10)
console.log("verao", verao)

const primeiraCompra = new Category("primeira compra", 30)
console.log("primeiraCompra", primeiraCompra)

const descontoVeraoShort = verao.calcularDesconto(short)
console.log("descontoVeraoShort", descontoVeraoShort)

//Desafio: Criar um sistema com diferentes tipos de funcionários (exemplo: programador, designer) utilizando herança
//Tarefa: Criar uma classe Funcionario com atributos como nome, salario, e um método calcularSalario()

class Funcionario {
    nome: string;
    salario: number;

    constructor(nome:string, salario?:number){
        this.nome = nome;
        this.salario = salario ?? 1500;
    }

    calcularSalario(){
        return this.salario;
    }

}

class Programador extends Funcionario {
    constructor(nome: string){
        super(nome);
    }

    calcularSalario(){
        return this.salario * 5;
    }

}

class Designer extends Funcionario {
    constructor(nome: string, salario: number){
        super(nome, salario);
    }

    calcularSalario(){
        return this.salario * 2
    }
}

//Criar classes específicas para cada tipo de funcionário, como Programador e Designer, 
//que herdam de Funcionario  e implementam seu próprio cálculo de salário

const vendedor = new Programador("Emilie")
const vendedor2 = new Designer("Emilie", 200)

console.log(vendedor.calcularSalario())
console.log(vendedor2.calcularSalario())