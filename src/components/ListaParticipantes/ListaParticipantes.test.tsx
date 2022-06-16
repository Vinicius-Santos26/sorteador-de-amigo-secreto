import { render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useListaDeParticipantes } from "state/hooks/useListaDeParticipantes";
import ListaParticipantes from '.';

jest.mock('state/hooks/useListaDeParticipantes', () => {
    return {
        useListaDeParticipantes: jest.fn()
    }
})


describe('Comportamento ListaParticipantes', () => {
    test('deve ser renderizadas sem elementos', () => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue([]);

        render(<RecoilRoot>
            <ListaParticipantes />
        </RecoilRoot>);
    
        const itens = screen.queryAllByRole('listitem');
    
        expect(itens).toHaveLength(0);
    })
    

    test('deve ser renderizadas os elementos da lista', () => {
        const participantes = ['Vinicius', 'Ana'];
        (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);

        render(<RecoilRoot>
            <ListaParticipantes />
        </RecoilRoot>);

        const itens = screen.queryAllByRole('listitem');
    
        expect(itens).toHaveLength(participantes.length);
    })
})