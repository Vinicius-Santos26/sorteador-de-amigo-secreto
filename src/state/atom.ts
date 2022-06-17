import { atom } from "recoil";

export const listaDeParticipantesState = atom<string[]>({
    key: 'listaDeParticipantesState',
    default: []
});

export const erroState = atom<string>({
    key: 'erroState',
    default: ''
});

export const resultadoAmigoSecretoState = atom<Map<string,string>>({
    key: 'resultadoAmigoSecretoState',
    default: new Map()
})