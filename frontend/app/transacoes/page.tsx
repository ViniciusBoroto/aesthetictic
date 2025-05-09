import type { Metadata } from "next"
import TransacoesPage from "./transacoes-page"

export const metadata: Metadata = {
  title: "Transações | Dashboard Financeiro",
  description: "Visualização e gerenciamento de todas as transações financeiras",
}

export default function Page() {
  return <TransacoesPage />
}
