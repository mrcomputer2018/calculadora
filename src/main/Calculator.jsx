import React, { Component } from "react"
import Button from "../components/Button";
import Display from "../components/Display";
import "./Calculator.css"

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

class Calculator extends Component {
    /**Inicia o estado com initialState fazendo um spread */
    state = {...initialState}

    constructor(props) {
        super(props)
        /* Resolvendo o problema do this */
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
        
    }

    clearMemory() {
       /*  console.log("Limpar"); */
       /** Voltando o estado para initialState */
       this.setState({...initialState})
    }

    setOperation(operation) {
        /* console.log(operation); */
        if(this.state.current === 0){
            /** Mudando o estado */
            this.setState({ operation, current: 1,  clearDisplay: true })
        }
        else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            try {
                /** Calculo do valor em cima da funcao EVAL */
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch (e) {
                values[0] = this.state.values[0]
            }
            values[1] = 0
            /** Colocando o estado para ser visto no display */
            this.setState({
                displayValue: values[0], 
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
            
        }
    }

    addDigit(n) {
        /* console.log(n); */
        /** Verificando se display ja tem PONTO com includes */
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        /** Mudando o estado da aplicacao */
        this.setState({ displayValue, clearDisplay: false })
        /** Se o valor for diferente de PoNTO vou armazenar */
        if(n !== '.'){
            /** Atribuidoa I para nao ficar manupilando o estado */
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            /** Duplico meu array e transformo em values */
            const values = [...this.state.values]
            values[i] = newValue
            /** Adicionando este array no estado do objeto */
            this.setState({ values })
        }
    }

    render() {
        return(
            <div className="Calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} double/>
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation/>
            </div>
        )
    }
}
export default Calculator;