import { ChangeEvent, createContext, ReactNode, useState } from "react";

interface FormProviderProps {
    children?: ReactNode;
}

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
    matricula: string;
    celular: string;
    fixo: string;
    data_filiacao: string;
    data_fim_filiacao: string;
    email: string;
    foto?: File | null;
    site: string;
    numero_cau: number;
    instituicao_ensino: string;
    ano_estimado_conclusao: number;
    endereco_primario: Endereco;
    endereco_secundario: Endereco;
}

interface FormDataProps extends FormObjectProps {
    password: string;
    confirmPassword: string;
}

interface FormProviderValueProps {
    formData: FormDataProps;
    currentPage: number;
    goToPreviousPage: () => void;
    goToNextPage: () => void;
    updateFormData: (e: ChangeEvent<HTMLInputElement>) => void;
    errors: string[];
    addError: (error: string) => void;
}

const defaultFormData = {
    nome: "TESTE",
    email: "",
    password: "",
    confirmPassword: "",
    cpf: "",
    uf_documento: "",
    matricula: "",
    celular: "",
    fixo: "",
    data_filiacao: "",
    data_fim_filiacao: "",
    foto: null,
    site: "",
    numero_cau: 0,
    instituicao_ensino: "",
    ano_estimado_conclusao: 0,
    profissao: "Arquiteto",
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

export const FormContext = createContext<FormProviderValueProps>({
    formData: defaultFormData,
    updateFormData: () => { },
    currentPage: 0,
    goToPreviousPage: () => { },
    goToNextPage: () => { },
    errors: [],
    addError: () => { },
});

export const FormProvider = ({ children }: FormProviderProps) => {
    const [currentPage, setCurrentPage] = useState(0);

    const [formData, setFormData] = useState(defaultFormData);

    const [errors, setErrors] = useState<string[]>([]);

    const goToNextPage = () => {
        if (currentPage < 3) {
            // 4 páginas ao todo
            setCurrentPage(currentPage + 1);
        }
    };
    const goToPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const updateFormData = (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        if (errors.includes(name)) {
            setErrors(errors.filter((fieldName) => fieldName !== name));
        }
        if (name === "cep" && value.length === 9) {
            // buscar cep
            console.log("buscar cep");
        }
        if (name.split('.').length > 1) {
            const parentField = name.split('.')[0] as 'endereco_primario' | 'endereco_secundario';
            setFormData((prevState) => ({
                ...prevState,
                [parentField]: { ...prevState[parentField], [name.split('.')[1]]: value },
            }));
        } else {
            setFormData((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    const addError = (error: string) => {
        setErrors([...errors, error]);
    };

    return (
        <FormContext.Provider
            value={{
                formData,
                updateFormData,
                currentPage,
                goToPreviousPage,
                goToNextPage,
                errors,
                addError,
            }}
        >
            {children}
        </FormContext.Provider>
    );
};
