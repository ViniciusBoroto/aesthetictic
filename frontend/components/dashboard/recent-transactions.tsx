"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, DollarSign, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface RecentTransactionsProps {
  className?: string
}

interface Transaction {
  id: number
  description: string
  amount: string
  date: Date
  type: "income" | "expense"
  category: string
  icon: React.ElementType
}

export default function RecentTransactions({ className }: RecentTransactionsProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/sale")
        if (!response.ok) {
          throw new Error("Erro ao buscar transações")
        }
        const data = await response.json()

        // Transformar os dados recebidos para o formato esperado
        const formattedData = data.map((transaction: any) => ({
          id: transaction.id,
          description: transaction.product.name, // Nome do produto
          amount: `R$ ${Number(transaction.price).toFixed(2)}`, // Preço formatado
          date: new Date(transaction.date_your_sale), // Data como objeto Date
          type: transaction.price > 0 ? "income" : "expense", // Determina o tipo com base no preço
          category: "Venda", // Categoria fixa (ajuste conforme necessário)
          icon: transaction.price > 0 ? DollarSign : ShoppingCart, // Ícone baseado no tipo
        }))

        // Ordenar as transações pela data (mais recente primeiro)
        const sortedData = formattedData.sort((a, b) => b.date.getTime() - a.date.getTime())

        // Pegar apenas as últimas 5 transações
        const latestTransactions = sortedData.slice(0, 5)

        setTransactions(latestTransactions)
      } catch (err) {
        console.error(err)
        setError("Não foi possível carregar as transações")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Transações Recentes</CardTitle>
          <CardDescription>Últimas transações financeiras</CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/transacoes">Ver todas</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-[300px] items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="text-sm text-muted-foreground">Carregando transações...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex h-[300px] flex-col items-center justify-center gap-2">
            <p className="text-destructive">{error}</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex h-[300px] items-center justify-center">
            <p className="text-muted-foreground">Nenhuma transação encontrada</p>
          </div>
        ) : (
          <div>
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
                        {transaction.category} • {transaction.date.toLocaleDateString("pt-BR")}
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
            <div className="mt-4 text-center text-xs text-muted-foreground">
              Mostrando as 5 transações mais recentes
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
