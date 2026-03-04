//Validador de Parênteses

/**
 * percorrer string = O(n)
 * push/pop = O(1)
 **/

class ValidadorParenteses {
	validar(expressao) {
		const pilha = [];

		for (let char of expressao) {
			if (char === '(') {
				pilha.push(char);
			} else if (char === ')') {
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
