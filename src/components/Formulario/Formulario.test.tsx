import { render, screen } from "@testing-library/react";
import React from "react";
import Formulario from ".";

test('Quando o input está vazio, novos participantes não podem ser adicionados', () => {
    
    render(<Formulario />);

    //encontrar o dom no input
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
    
    //encontrar o botão
    const botao = screen.getByRole('button');

    //garantir que o input esteja no documento
    expect(input).toBeInTheDocument();

    //garantir que o botão esteja disable
    expect(botao).toBeDisabled();
})