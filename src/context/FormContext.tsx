import { ChangeEvent, createContext, ReactNode, useState } from "react";
import { defaultFormData, FormDataProps } from "../types/formdata";

interface FormProviderProps {
    children?: ReactNode;
}

interface FormProviderValueProps {
    formData: FormDataProps;
    currentPage: number;
    goToPreviousPage: () => void;
    goToNextPage: () => void;
    updateFormData: (e: ChangeEvent<HTMLInputElement>) => void;
    errors: string[];
    addError: (newErrors: string[]) => void;
}

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
            setErrors([])
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
            console.log(formData)
            setFormData((prevState) => ({
                ...prevState,
                [parentField]: { ...prevState[parentField], [name.split('.')[1]]: value },
            }));
        } else {
            setFormData((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    const addError = (newErrors: string[]) => {
        setErrors((prevState) => [...prevState, ...newErrors]);
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
