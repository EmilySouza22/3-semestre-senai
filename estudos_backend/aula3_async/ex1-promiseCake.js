// Criar uma funcao que retorna uma promisse, e a ideia é simular o preparo do bolo
// Receber tempo de assamento
// Lógica que trata, se o tempo que foi passado é suficente pro bolo assar ou não
// Se sim, retorna a função do resolve -> informando que o bolo assou com sucesso
// Se não, retorna reject com bolo queimado ou cru
// finally, criatividade de voces.

function assarBolo(tempoDeForno) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { 
            if(tempoDeForno < 35){
                reject(new Error('O bolo ficou cru!'))
            } else if(tempoDeForno > 40 && tempoDeForno < 45) {
                resolve (`O bolo assou em ${tempoDeForno} minutos`)
            } else if(tempoDeForno >= 50) {
                reject(new Error('O bolo queimou!'))}
            })
        }, tempoDeForno);
    }
assarBolo(42).then(resultado => console.log(resultado)).catch((error) => console.error(error)).finally(() => console.log('Finalizado'))