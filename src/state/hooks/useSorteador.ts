import { realizarSorteio } from './../helpers/realizarSorteio';
import { useSetRecoilState } from 'recoil';
import { resultadoAmigoSecretoState } from 'state/atom';
import { useListaDeParticipantes } from './useListaDeParticipantes';

export const useSorteador = () => {
    const participantes = useListaDeParticipantes();
    const setResultado = useSetRecoilState(resultadoAmigoSecretoState);

    return () => {      
        const resultado = realizarSorteio(participantes);
        setResultado(resultado);
    }
}