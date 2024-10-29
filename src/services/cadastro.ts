import { FormDataProps } from "../context/FormContext";
import { api } from "./api";

export const cadastrar = async (formData: FormDataProps) => {
    const response = await api.post("/cadastrar", formData);
    return response.data;
}