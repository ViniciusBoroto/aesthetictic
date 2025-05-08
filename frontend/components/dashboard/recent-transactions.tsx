"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, CreditCard, DollarSign, ShoppingCart, Building, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"

interface RecentTransactionsProps {
  className?: string
}

export default function RecentTransactions({ className }: RecentTransactionsProps) {
  // Fictional transaction data
  const transactions = [
    {
      id: 1,
      description: "Pagamento de Cliente XYZ",
      amount: "R$ 12.500,00",
      date: "12/05/2025",
      type: "income",
      category: "Vendas",
      icon: DollarSign,
    },
    {
      id: 2,
      description: "Aluguel do Escritório",
      amount: "R$ 3.800,00",
      date: "10/05/2025",
      type: "expense",
      category: "Instalações",
      icon: Building,
    },
    {
      id: 3,
      description: "Assinatura Software",
      amount: "R$ 750,00",
      date: "08/05/2025",
      type: "expense",
      category: "Tecnologia",
      icon: CreditCard,
    },
    {
      id: 4,
      description: "Pagamento de Cliente ABC",
      amount: "R$ 8.300,00",
      date: "05/05/2025",
      type: "income",
      category: "Vendas",
      icon: DollarSign,
    },
    {
      id: 5,
      description: "Material de Escritório",
      amount: "R$ 420,00",
      date: "03/05/2025",
      type: "expense",
      category: "Suprimentos",
      icon: ShoppingCart,
    },
    {
      id: 6,
      description: "Consultoria Jurídica",
      amount: "R$ 1.800,00",
      date: "01/05/2025",
      type: "expense",
      category: "Serviços",
      icon: Briefcase,
    },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Transações Recentes</CardTitle>
        <CardDescription>Últimas 6 transações financeiras</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full",
                    transaction.type === "income" ? "bg-emerald-100" : "bg-rose-100",
                  )}
                >
                  <transaction.icon
                    className={cn("h-5 w-5", transaction.type === "income" ? "text-emerald-600" : "text-rose-600")}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.category} • {transaction.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={cn(
                    "text-sm font-medium",
                    transaction.type === "income" ? "text-emerald-600" : "text-rose-600",
                  )}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {transaction.amount}
                </span>
                {transaction.type === "income" ? (
                  <ArrowUpIcon className="h-4 w-4 text-emerald-600" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 text-rose-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
