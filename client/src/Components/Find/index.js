import { api } from "../../Services/api";
import { useEffect, useState } from "react";
import { Table } from "../Table";

export const Find = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await api.get("/")
            setUsers(res.data);
            await localStorage.setItem("SalvandoDados", JSON.stringify(users))
        })();
    }, [users]);

    const find = users.map((user) => (
    <tr key={user.idusuarios}>
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
));

    return (
        <fieldset>
            <legend>Consultar Todos os Usuários</legend>
            <Table>
                {find}
            </Table>
        </fieldset>
    )
}

