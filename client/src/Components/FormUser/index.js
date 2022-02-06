import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { api } from "../../Services/api";

import "./styles.scss";

export const FormUser = ({
    formTitle, 
    register = false,
    nameButton }) => {

    const handleClickRegister = async (values) => {
        console.log('teste')
        try {
            await api.post(`new-user`, {
                nome: values.nome,
                data_de_nascimento: values.data_de_nascimento,
                cpf: values.cpf,
                sexo: values.sexo,
                endereco: values.endereco,
                status: values.status,
                foto_de_perfil: values.foto_de_perfil
            }).then((res) => {
                console.log(res)
            })
        } catch (err) {
            console.log("Erro: " + err)
        }
    }

    const handleClickUpdate = (values) => {
        try {
            api.put("update/" + values.cpf, {
                nome: values.nome,
                data_de_nascimento: values.data_de_nascimento,
                sexo: values.sexo,
                endereco: values.endereco,
                status: values.status,
                foto_de_perfil: values.foto_de_perfil
            })
        } catch (err) {
            console.log("Erro: " + err)
        }
    }

    const validationUser = yup.object().shape({
        nome: yup.string().required('Este campo é obrigatório'),
        data_de_nascimento: yup.string().required('Este campo é obrigatório'),
        cpf: yup.string().min(11).max(11).required('Este campo é obrigatório'),
        sexo: yup.string().max(9).required('Este campo é obrigatório'),
        endereco: yup.string(),
        status: yup.string().required('Este campo é obrigatório'),
        foto_de_perfil: yup.string().required('Este campo é obrigatório'),
    })

    return (
        <fieldset>
            <legend>{formTitle} Usuário</legend>
            <Formik 
                initialValues={{}}
                onSubmit={
                    register ? handleClickRegister : handleClickUpdate
                }
                validationSchema={validationUser}
            >
                <Form className="form">
                    <FormInput
                        titleField="Nome"
                        placeHolder="Ex: João Ricardo Siva"
                        nameField="nome"
                    />
                    <FormInput
                        titleField="Data de Nascimento"
                        placeHolder="Ex: 1997-01-24"
                        nameField="data_de_nascimento"
                    />
                    <FormInput
                        titleField="CPF"
                        placeHolder="Ex: 12345678912"
                        nameField="cpf"
                    />
                    <FormInput
                        titleField="Sexo"
                        placeHolder="Ex: Masculino"
                        nameField="sexo"
                    />
                    <FormInput
                        titleField="Endereço"
                        placeHolder="Ex: Rua Conceição, 89"
                        nameField="endereço"
                    />
                    <FormInput
                        titleField="Status"
                        placeHolder="Ativo"
                        nameField="status"
                    />
                    <FormInput
                        titleField="Foto de Perfil"
                        placeHolder="Ex: http://foto.png"
                        nameField="foto_de_perfil"
                    />

                <button type="submit" className="button">
                    {nameButton}
                </button>
                </Form>
            </Formik>
        </fieldset>
    )
}

const FormInput = ({titleField, placeHolder, nameField}) => {
    return (
        <div className="form-group">
            <label>
                <p>{titleField}</p>
                <Field 
                    placeholder={placeHolder}
                    name={nameField}
                    className="form-field"
                    />
            </label>
            <ErrorMessage 
                component="span"
                name={nameField}
                className="form-error"
            />
        </div> 
    )
}