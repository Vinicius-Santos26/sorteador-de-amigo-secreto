import { useState } from "react";
import { useListaDeParticipantes } from "state/hooks/useListaDeParticipantes";
import { useResultadoDoSorteio } from "state/hooks/useResultadoDoSorteio";
import Card from "components/Card";
import styles from "./Sorteio.module.scss";

const Sorteio = () => {
    const participantes = useListaDeParticipantes();

    const [participanteDaVez, setParticipanteDaVez] = useState('');
    const [amigoSecreto, setAmigoSecreto] = useState('');

    const resultado = useResultadoDoSorteio();

    const sortear = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        if (resultado.has(participanteDaVez)) {
            setAmigoSecreto(resultado.get(participanteDaVez)!)
        }
    }

    return (<Card>
        <section className={styles.sorteio}>
            <h2>Quem vai tirar o papelzinho?</h2>
            <form onSubmit={sortear}>
                <select
                    required
                    name="participanteDavez"
                    id="participanteDavez"
                    placeholder="Selecione o seu nome"
                    value={participanteDaVez}
                    onChange={evento => setParticipanteDaVez(evento.target.value)}
                >
                    <option>Selecione seu nome</option>
                    {participantes.map(participante => <option key={participante}>{participante}</option>)}
                </select>
                <p>Clique em em sortear para ver quem é seu amigo secreto!</p>
                <button className={styles["botao-sortear"]}>Sortear</button>
            </form>
            {amigoSecreto && <p className={styles.resultado} role="alert">{amigoSecreto}</p>}
            <footer>
                <img src="/imagens/aviao.png" alt="Um desenho de um avião de papel" />
            </footer>
        </section>
    </Card>);
}

export default Sorteio;