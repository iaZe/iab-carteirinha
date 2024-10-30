import { FormDataProps } from "../types/formdata";
import { api } from "./api.ts";

export const cadastrar = async (formData: FormDataProps) => {
   try {  
    
    const response = await api.post("/cadastrar", formData);
    return response.data; 
}   catch (error) {
    throw new Error('Erro ao fazer login');
  }
};
