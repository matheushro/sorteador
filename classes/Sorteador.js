module.exports = class Sorteador {
    //propriedades e funções da classe aqui
    constructor(tipo, num1, num2, nome, ordem, total) {
        this.tipo = tipo;
        this.num1 = num1;
        this.num2 = num2;
        this.nome = nome;
        this.ordem = ordem;
        this.total = total;
    }

    compareNumbers(a, b) {
        return a - b;
    }
    compareNumbersDesc(a, b) {
        return b - a;
    }

}