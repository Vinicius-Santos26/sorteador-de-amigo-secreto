import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { useListaDeParticipantes } from "state/hooks/useListaDeParticipantes";
import Rodape from '.';

jest.mock('state/hooks/useListaDeParticipantes', () => {
    return {
        useListaDeParticipantes: jest.fn()
    }
})

const mockDeNavegacao = jest.fn();
const mockSorteio = jest.fn();

jest.mock('react-router-dom', () => {
    return {
        useNavigate: () => mockDeNavegacao
    }
})

jest.mock('state/hooks/useSorteador', () => {
    return {
        useSorteador: () => mockSorteio
    }
})

describe('Comportamento Rodape', () => {
    describe('A brincadeira não pode ser iniciada', () => {
        test('Lista de participantes vazia', () => {
            (useListaDeParticipantes as jest.Mock).mockReturnValue([]);

            render(<RecoilRoot>
                <Rodape />
            </RecoilRoot>);

            const botao = screen.getByRole('button');

            expect(botao).toBeDisabled();
        })
    })

    describe('A brincadeira pode ser iniciada', () => {
        const participantes = ['Vinicius', 'Ana', 'Beatriz'];

        beforeEach(() => {
            (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
        });

        test('Lista de participante > 3', () => {
            render(<RecoilRoot>
                <Rodape />
            </RecoilRoot>);

            const botao = screen.getByRole('button');
            expect(botao).not.toBeDisabled();
        })

        test('A brincadeira foi iniciada', () => {
            render(<RecoilRoot>
                <Rodape />
            </RecoilRoot>);

            const botao = screen.getByRole('button');
            fireEvent.click(botao);

            expect(mockDeNavegacao).toHaveBeenCalledTimes(1);
            expect(mockDeNavegacao).toBeCalledWith('/sorteio');
            expect(mockSorteio).toBeCalledTimes(1);
        })
    })

})