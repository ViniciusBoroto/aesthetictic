"use client"

import type React from "react"

import { useEffect, useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  DollarSign,
  ShoppingCart,
  Download,
  Search,
  ArrowUpDown,
  ArrowDownIcon,
  ArrowUpIcon,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import DashboardHeader from "@/components/layout/dashboard-header"
import Sidebar from "@/components/layout/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Transaction {
  id: number
  description: string
  amount: string
  date: Date
  type: "income" | "expense"
  category: string
  icon: React.ElementType
  rawAmount: number
}

export default function TransacoesPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<"all" | "income" | "expense">("all")
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "highest" | "lowest">("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const transactionsPerPage = 10

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/sale")
        if (!response.ok) {
          throw new Error("Erro ao buscar transações")
        }
        const data = await response.json()

        // Transformar os dados recebidos para o formato esperado
        const formattedData = data.map((transaction: any) => {
          const price = Number(transaction.price)
          return {
            id: transaction.id,
            description: transaction.product.name, // Nome do produto
            amount: `R$ ${Math.abs(price).toFixed(2)}`, // Preço formatado
            date: new Date(transaction.date_your_sale), // Data como objeto Date
            type: price > 0 ? "income" : "expense", // Determina o tipo com base no preço
            category: "Venda", // Categoria fixa (ajuste conforme necessário)
            icon: price > 0 ? DollarSign : ShoppingCart, // Ícone baseado no tipo
            rawAmount: price, // Valor bruto para ordenação
          }
        })

        setTransactions(formattedData)
        setFilteredTransactions(formattedData)
      } catch (err) {
        console.error(err)
        setError("Não foi possível carregar as transações")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  // Aplicar filtros e ordenação
  useEffect(() => {
    let result = [...transactions]

    // Filtrar por tipo (receita/despesa)
    if (typeFilter !== "all") {
      result = result.filter((transaction) => transaction.type === typeFilter)
    }

    // Filtrar por termo de busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (transaction) =>
          transaction.description.toLowerCase().includes(term) ||
          transaction.amount.toLowerCase().includes(term) ||
          transaction.category.toLowerCase().includes(term),
      )
    }

    // Aplicar ordenação
    switch (sortOrder) {
      case "newest":
        result.sort((a, b) => b.date.getTime() - a.date.getTime())
        break
      case "oldest":
        result.sort((a, b) => a.date.getTime() - b.date.getTime())
        break
      case "highest":
        result.sort((a, b) => Math.abs(b.rawAmount) - Math.abs(a.rawAmount))
        break
      case "lowest":
        result.sort((a, b) => Math.abs(a.rawAmount) - Math.abs(b.rawAmount))
        break
    }

    setFilteredTransactions(result)
    // Resetar para a primeira página quando os filtros mudam
    setCurrentPage(1)
  }, [transactions, searchTerm, typeFilter, sortOrder])

  // Calcular totais
  const totals = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.rawAmount
      } else {
        acc.expense += Math.abs(transaction.rawAmount)
      }
      acc.balance = acc.income - acc.expense
      return acc
    },
    { income: 0, expense: 0, balance: 0 },
  )

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        <main className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Transações</h2>
              <p className="text-muted-foreground">Gerencie e visualize todas as suas transações financeiras</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Download className="h-3.5 w-3.5" />
                <span>Exportar</span>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Receitas</CardTitle>
                <DollarSign className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600">{formatCurrency(totals.income)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Despesas</CardTitle>
                <ShoppingCart className="h-4 w-4 text-rose-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-rose-600">{formatCurrency(totals.expense)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saldo</CardTitle>
                <ArrowUpDown className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className={cn("text-2xl font-bold", totals.balance >= 0 ? "text-emerald-600" : "text-rose-600")}>
                  {formatCurrency(totals.balance)}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="todas" className="space-y-4">
            <TabsList>
              <TabsTrigger value="todas">Todas</TabsTrigger>
              <TabsTrigger value="receitas">Receitas</TabsTrigger>
              <TabsTrigger value="despesas">Despesas</TabsTrigger>
            </TabsList>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar transações..."
                  className="w-full pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as any)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="income">Receitas</SelectItem>
                    <SelectItem value="expense">Despesas</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as any)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Mais recentes</SelectItem>
                    <SelectItem value="oldest">Mais antigas</SelectItem>
                    <SelectItem value="highest">Maior valor</SelectItem>
                    <SelectItem value="lowest">Menor valor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="todas">
              <TransactionsList
                transactions={filteredTransactions}
                isLoading={isLoading}
                error={error}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </TabsContent>
            <TabsContent value="receitas">
              <TransactionsList
                transactions={transactions.filter((t) => t.type === "income")}
                isLoading={isLoading}
                error={error}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </TabsContent>
            <TabsContent value="despesas">
              <TransactionsList
                transactions={transactions.filter((t) => t.type === "expense")}
                isLoading={isLoading}
                error={error}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

interface TransactionsListProps {
  transactions: Transaction[]
  isLoading: boolean
  error: string | null
  currentPage: number
  setCurrentPage: (page: number) => void
}

function TransactionsList({ transactions, isLoading, error, currentPage, setCurrentPage }: TransactionsListProps) {
  const transactionsPerPage = 10

  // Calcular o número total de páginas
  const totalPages = Math.ceil(transactions.length / transactionsPerPage)

  // Obter as transações da página atual
  const indexOfLastTransaction = currentPage * transactionsPerPage
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction)

  // Função para mudar de página
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
      // Rolar para o topo da lista
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Gerar array de números de página para exibição
  const pageNumbers = []
  const maxPageButtons = 5 // Número máximo de botões de página a serem exibidos

  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2))
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1)

  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex h-[400px] items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="text-sm text-muted-foreground">Carregando transações...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex h-[400px] flex-col items-center justify-center gap-2">
            <p className="text-destructive">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex h-[400px] items-center justify-center">
            <p className="text-muted-foreground">Nenhuma transação encontrada</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="rounded-md border">
          <div className="grid grid-cols-[1fr_auto] gap-4 p-4 font-medium text-sm bg-muted/50 sm:grid-cols-[1fr_1fr_auto_auto]">
            <div>Descrição</div>
            <div className="hidden sm:block">Data</div>
            <div>Categoria</div>
            <div className="text-right">Valor</div>
          </div>
          <div className="divide-y">
            {currentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="grid grid-cols-[1fr_auto] gap-4 p-4 items-center sm:grid-cols-[1fr_1fr_auto_auto]"
              >
                <div className="flex items-center gap-3">
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
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground sm:hidden">
                      {transaction.date.toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
                <div className="hidden text-muted-foreground sm:block">
                  {transaction.date.toLocaleDateString("pt-BR")}
                </div>
                <div className="text-muted-foreground">{transaction.category}</div>
                <div className="flex items-center justify-end gap-2">
                  <span
                    className={cn("font-medium", transaction.type === "income" ? "text-emerald-600" : "text-rose-600")}
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
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Página anterior</span>
            </Button>

            {startPage > 1 && (
              <>
                <Button
                  variant={currentPage === 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => paginate(1)}
                  className="h-8 w-8"
                >
                  1
                </Button>
                {startPage > 2 && <span className="text-sm text-muted-foreground">...</span>}
              </>
            )}

            {pageNumbers.map((number) => (
              <Button
                key={number}
                variant={currentPage === number ? "default" : "outline"}
                size="sm"
                onClick={() => paginate(number)}
                className="h-8 w-8"
              >
                {number}
              </Button>
            ))}

            {endPage < totalPages && (
              <>
                {endPage < totalPages - 1 && <span className="text-sm text-muted-foreground">...</span>}
                <Button
                  variant={currentPage === totalPages ? "default" : "outline"}
                  size="sm"
                  onClick={() => paginate(totalPages)}
                  className="h-8 w-8"
                >
                  {totalPages}
                </Button>
              </>
            )}

            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Próxima página</span>
            </Button>
          </div>
        )}

        {/* Informações sobre a paginação */}
        <div className="text-center text-sm text-muted-foreground mt-2">
          Mostrando {indexOfFirstTransaction + 1}-{Math.min(indexOfLastTransaction, transactions.length)} de{" "}
          {transactions.length} transações
        </div>
      </CardContent>
    </Card>
  )
}
