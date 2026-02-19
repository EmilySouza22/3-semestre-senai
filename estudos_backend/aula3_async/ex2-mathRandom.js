// Criar uma função que recebe um número aleatório, gerem o numero aleatorio
// quando chamar a funcao(usem metodos js)
// se o numero for maior que 5, retorna resolve, se não retorna reject
// usem o finally livremente

function gerarNumeroAleatorio() {
    return new Promise((resolve, reject) => {
        let numeroAleatorio = Math.floor(Math.random() * 10) + 1;

        if(numeroAleatorio > 5){
            resolve (`O numero aleatório gerado foi ${numeroAleatorio}`)
        }else{
            reject(new Error(`Falhou! O número gerado foi ${numeroAleatorio}`))}
        }
    )}
gerarNumeroAleatorio()
    .then(resultado => console.log(resultado))
    .catch((error) => console.error(error))
    .finally(() => console.log('Finalizado'))
