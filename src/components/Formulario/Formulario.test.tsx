import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import Formulario from ".";

describe('Comportamento do Formulario', () => {
    test('Quando o input está vazio, novos participantes não podem ser adicionados', () => {

        render(<RecoilRoot><Formulario /></RecoilRoot>);

        //encontrar o dom no input
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes');

        //encontrar o botão
        const botao = screen.getByRole('button');

        //garantir que o input esteja no documento
        expect(input).toBeInTheDocument();

        //garantir que o botão esteja disable
        expect(botao).toBeDisabled();
    })

    test('Adicionar um participante caso exista um nome preenchido', () => {

        render(<RecoilRoot><Formulario /></RecoilRoot>);

        //encontrar o dom no input
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes');

        //encontrar o botão
        const botao = screen.getByRole('button');

        //inserir valor no input
        fireEvent.change(input, {
            target: {
                value: 'Vinicius Santos'
            }
        })

        //clicar no botão de submit
        fireEvent.click(botao)

        //garantir que o input esteja com o foco ativo
        expect(input).toHaveFocus();

        //garantir que o input não tenha um valor
        expect(input).toHaveValue("");
    })


    test('Nome duplicados nao podem ser adicionados na lista', () => {
        render(<RecoilRoot><Formulario /></RecoilRoot>);

        //encontrar o dom no input
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes');

        //encontrar o botão
        const botao = screen.getByRole('button');

        //inserir valor no input
        fireEvent.change(input, {
            target: {
                value: 'Vinicius Santos'
            }
        })

        //clicar no botão de submit
        fireEvent.click(botao)

        //inserir valor no input
        fireEvent.change(input, {
            target: {
                value: 'Vinicius Santos'
            }
        })

        //clicar no botão de submit
        fireEvent.click(botao)

        const mensagemErro = screen.getByRole('alert');

        expect(mensagemErro.textContent).toBe('Nomes duplicados nao sao permitidos');
    })


    test('A mensagem de erro deve sumir apos o timer', () => {
        jest.useFakeTimers();

        render(<RecoilRoot><Formulario /></RecoilRoot>);

        //encontrar o dom no input
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes');

        //encontrar o botão
        const botao = screen.getByRole('button');

        //inserir valor no input
        fireEvent.change(input, {
            target: {
                value: 'Vinicius Santos'
            }
        })

        //clicar no botão de submit
        fireEvent.click(botao)

        //inserir valor no input
        fireEvent.change(input, {
            target: {
                value: 'Vinicius Santos'
            }
        })

        //clicar no botão de submit
        fireEvent.click(botao)

        let mensagemErro = screen.queryByRole('alert');

        expect(mensagemErro).toBeInTheDocument();

        act(() => {
            jest.runAllTimers();
        });

        mensagemErro = screen.queryByRole('alert');
        expect(mensagemErro).toBeNull();
    })
});