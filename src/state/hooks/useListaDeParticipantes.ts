import { listaDeParticipantesState } from 'state/atom';
import { useRecoilValue } from 'recoil';

export const useListaDeParticipantes = () => {
    return useRecoilValue(listaDeParticipantesState);
}