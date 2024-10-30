import { ChangeEvent, createContext, ReactNode, useState } from "react";
import { cadastrar } from "../services/cadastro";
import { defaultFormData, FormDataProps } from "../types/formdata";

interface FormProviderProps {
    children?: ReactNode;
}

interface FormProviderValueProps {
    formData: FormDataProps;
    currentPage: number;
    goToPreviousPage: () => void;
    goToNextPage: () => void;
    isLoading: boolean;
    sendFormData: () => void;
    updateFormData: (e: ChangeEvent<HTMLInputElement>) => void;
    errors: string[];
    addError: (newErrors: string[]) => void;
}

export const FormContext = createContext<FormProviderValueProps>({
    formData: defaultFormData,
    isLoading: false,
    sendFormData: () => {},
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

    const [isLoading, setIsLoading] = useState(false)

    const [errors, setErrors] = useState<string[]>([]);

    const goToNextPage = () => {
        if (currentPage < 3) {
            // 4 páginas ao todo
            setCurrentPage(currentPage + 1);
        }
    };
    const goToPreviousPage = () => {
        if (currentPage > 0) {
            setErrors([])
            setCurrentPage(currentPage - 1);
        }
    };

    const addError = (newErrors: string[]) => {
        setErrors((prevState) => [...prevState, ...newErrors]);
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
            console.log(formData)
            setFormData((prevState) => ({
                ...prevState,
                [parentField]: { ...prevState[parentField], [name.split('.')[1]]: value },
            }));
        } else {
            setFormData((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    const sendFormData = async () => {
        setIsLoading(true);
        try {
            await cadastrar(formData); // Agora o await funcionará corretamente
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
        } finally {
            setIsLoading(false); // Define loading como false após a chamada
        }
    }

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
                sendFormData,
                isLoading
            }}
        >
            {children}
        </FormContext.Provider>
    );
};
