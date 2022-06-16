import { erroState } from './../atom';
import { useSetRecoilState, useRecoilValue } from "recoil"
import { listaDeParticipantesState } from "state/atom"


export const useAdicionarParticipante = () => {
    const setLista = useSetRecoilState(listaDeParticipantesState);
    const lista = useRecoilValue(listaDeParticipantesState);
    const setErro = useSetRecoilState(erroState);

    return (nomeDoParticipante: string) => {
        if (lista.includes(nomeDoParticipante)) {
            setErro('Nomes duplicados nao sao permitidos');
            setTimeout(() => {
                setErro('');
            }, 5000)
            return;
        }
        return setLista(listaAtual => [...listaAtual, nomeDoParticipante]);
    }
}