import { useState } from "react";
import { Table } from "../Table";

export const FindByName = () => {

    const [name, setName] = useState('');

    const ourArray = JSON.parse( localStorage.getItem("SalvandoDados"))

    console.log(ourArray)

    return (
        <fieldset>
            <legend>Encontre pelo nome</legend>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite o nome aqui"
            />

            <Table>
                {
                    ourArray.filter(u => u.nome === name).map((user) => (
                        <tr key={user.id_pacientes} >
                            <td>
                                <img src={user.foto_de_perfil} alt={user.nome} />
                            </td>
                            <td>
                                {user.nome}
                            </td>
                            <td>
                                {user.data_de_nascimento.slice(0, 10).replace(/(\d{3})(\d{2})(\d{2})/, "$1/$2/$3")}
                            </td>
                            <td>
                            {user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}
                            </td>
                            <td>
                                {user.sexo}
                            </td>
                            <td>
                                {user?.endereco}
                            </td>
                            <td>
                                {user.status}
                            </td>
                        </tr>
                    )) 
                }
            </Table>

    </fieldset>
    )
}