import { createContext, ReactNode, useState } from "react";

interface FormProviderProps {
    children?: ReactNode;
}


export interface FormObjectProps {
    [key: string]: string | number | File | null | undefined;
    nome: string;
    cpf: string;
    uf_documento: string; 
    matricula: string;
    celular: string;
    fixo: string;
    data_filiacao: string; 
    data_fim_filiacao: string;
    endereco: string;
    email: string;
    foto?: File | null;
    site: string;
    numero_cau: number;
    instituicao_ensino: string;
    ano_estimado_conclusao: number;
}

interface FormDataProps extends FormObjectProps {
    password: string;
    confirmPassword: string;

}

interface FormProviderValueProps {
    formData: FormDataProps,
    updateFormData: (field: keyof FormDataProps, value: string | number | File) => void
    currentPage: number,
    goToPreviousPage: () => void,
    goToNextPage: () => void,
}

const defaultFormData = {
    nome: "",
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
    endereco: "",
    foto: null,
    site: "",
    numero_cau: 0,
    instituicao_ensino: "",
    ano_estimado_conclusao: 0,
}

export const FormContext = createContext<FormProviderValueProps>({
    formData: defaultFormData,
    updateFormData: () => {},
    currentPage: 0,
    goToPreviousPage: () => {},
    goToNextPage: () => {},
});

export const FormProvider = ({ children }: FormProviderProps) => {

    const [currentPage, setCurrentPage] = useState(0)

    const [formData, setFormData] = useState(defaultFormData)


    const goToNextPage = () => {
        if (currentPage < 3) { // 4 páginas ao todo
            setCurrentPage(currentPage + 1)
        }
    }
    const goToPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const updateFormData = (field: keyof FormDataProps, value: string | number | File) => {
        setFormData(prevFormData => ({ ...prevFormData, [field]: value }));
    };


    return (
        <FormContext.Provider value={{ formData, updateFormData, currentPage, goToPreviousPage, goToNextPage }}>
            {children}
        </FormContext.Provider>
    );
}