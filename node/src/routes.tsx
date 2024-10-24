import App from "./App";
import { Cadastro } from "./pages/Cadastro";
import { Login } from "./pages/Login";
import { FormProvider } from "./context/FormContext";
import { Pagamento } from "./pages/Pagamento";
import { Institucional } from "./pages/Institucional";
import { Convenios } from "./pages/Convenios";
import AguardandoConfirmacao from "./pages/AguardandoConfirmacao";

export const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "cadastro",
                element: <FormProvider><Cadastro /></FormProvider>,
            },
            {
                path: "pagamento",
                element: <Pagamento />
            },
            {
                path: "aguardando-confirmacao",
                element: <AguardandoConfirmacao />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "institucional",
                element: <Institucional />
            },
            {
                path: "convenios",
                element: <Convenios />
            },
            {
                path: "perfil",
                element: <div>Página de Perfil</div>
            }
        ]
    }
]