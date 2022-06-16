import { useRef, useState } from "react";
import { useAdicionarParticipante } from "state/hooks/useAdicionarParticipante";
import { useMensagemDeErro } from "state/hooks/useMensagemDeErro";

const Formulario = () => {
    const [nome, setNome] = useState("");

    const inputRef = useRef<HTMLInputElement>(null);

    const adicionarNaLista = useAdicionarParticipante();

    const mensagemDeErro = useMensagemDeErro();

    const adicionarParticipante = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        adicionarNaLista(nome);

        setNome('');
        inputRef.current?.focus();
    }

    return (
        <form onSubmit={adicionarParticipante}>
            <input ref={inputRef} type="text" placeholder="Insira os nomes dos participantes" value={nome} onChange={evento => setNome(evento.target.value)}></input>
            <button disabled={!nome}>Adicionar</button>
            {mensagemDeErro && <p role='alert'>{mensagemDeErro}</p>}
        </form>
    )
}

export default Formulario;