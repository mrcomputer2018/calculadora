import React from "react"
import "./Button.css"

const Button = (props) => {
    let classes = "Button "
    classes += props.operation ? 'operation' : ''
    classes += props.double ? 'double' : ''
    classes += props.triple ? 'triple' : ''

    return (
        <button 
            className={ classes }
            /* Conteudo do elemento sera passado para funcao click */
            onClick={ (event) => props.click && props.click(props.label) }>
                { props.label }
        </button>
    )
}
export default Button;