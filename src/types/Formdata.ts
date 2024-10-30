
interface Endereco {
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
}

export interface FormObjectProps {
    [key: string]: string | number | File | null | Endereco | undefined;
    nome: string;
    cpf: string;
    uf_documento: string;
    matricula_faculdade: string;
    celular: string;
    fixo: string;
    data_filiacao: string;
    data_fim_filiacao: string;
    email: string;
    foto?: File | null;
    site: string;
    numero_cau: string;
    instituicao_ensino: string;
    ano_estimado_conclusao: string;
    usuario: string;
    senha: string;
    endereco_primario: Endereco;
    endereco_secundario: Endereco;
}

export interface FormDataProps extends FormObjectProps {
    password: string;
    confirmPassword: string;
}



export const defaultFormData = {
    nome: "",
    email: "",
    password: "",
    confirmPassword: "",
    cpf: "",
    uf_documento: "",
    matricula_faculdade: "",
    celular: "",
    fixo: "",
    data_filiacao: "",
    data_fim_filiacao: "",
    foto: null,
    site: "",
    numero_cau: "",
    instituicao_ensino: "",
    ano_estimado_conclusao: "",
    profissao: "Arquiteto",
    usuario: "",
    senha: "",
    endereco_primario: {
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
    },
    endereco_secundario: {
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
    },
};