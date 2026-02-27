//Ordenar array
const usuarios = [12, 45, 3, 89, 21, 67, 34, 10];

// Ordenado vai ficar assim [3,10,12,21,34,45,67,89]
const usuariosOrdenados = usuarios.sort((a, b) => a - b);

function buscaBinaria(arr, valor) {
  let inicio = 0;
  let fim = arr.length - 1;

  while (inicio <= fim) {
    let meio = Math.floor((inicio + fim) / 2);0
    if (arr[meio] === valor) return meio;

    if (arr[meio] < valor) inicio = meio + 1;
    else fim = meio - 1;
  }

  return -1;
}

console.log(buscaBinaria(usuariosOrdenados, 12));
//deve retornar 2
