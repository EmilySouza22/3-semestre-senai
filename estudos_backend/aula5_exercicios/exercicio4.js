//Validador de Parênteses

/**
 * percorrer string = O(n)
 * push/pop = O(1)
 **/

class ValidadorParenteses {
	validar(expressao) {
		const pilha = [];

		for (let char of expressao) {
			if (char === '(' || char === '[' || char === '{' ) {
				pilha.push(char);
			} else if (char === ')' || char === ']' || char === '}' ) {
				if (pilha.length === 0) {
					return false;
				}
				pilha.pop();
			}
		}
		return pilha.length === 0;
	}
}

const validador = new ValidadorParenteses();

console.log(validador.validar('((a+b)*c)'));
console.log(validador.validar('(a + b'));
console.log(validador.validar('a + b)'));


// Outra forma

function validarBalanceamento(expressao) {
	const pilha = []
	const pares = {
		")" : "(",
		"]" : "[",
		"}" : "}"
	}

	const quemAbre = new Set(["(", "[", "{"])

	for(const caractere of expressao) {
		if(quemAbre.has(caractere)) {
			pilha.push(caractere);
		} else if (caractere in pares) {
			if(pilha.length === 0) {
				return false;
			}
			const topo = pilha.pop()
			if(topo !== pares[caractere]){
				return false;
			}
		}
	}

	return pilha.length == 0;
}

console.log(validarBalanceamento('((a+b)*c)'))