// Criar uma funcao que retorna uma promisse, e a ideia é simular o preparo do bolo
// Receber tempo de assamento
// Lógica que trata, se o tempo que foi passado é suficente pro bolo assar ou não
// Se sim, retorna a função do resolve -> informando que o bolo assou com sucesso
// Se não, retorna reject com bolo queimado ou cru
// finally, criatividade de voces.

function assarBolo(tempo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve (`O bolo assou em ${tempo} milissegundos`)
    
        reject(new Error('O bolo queimou!'))}, tempo);
    })
}
assarBolo(5000).then(resultado => console.log(resultado)).catch((error) => console.error).finally(() => console.log('Finalizado'))