"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  BarChart3,
  LineChart,
  PieChart,
  Wallet,
  CreditCard,
  BanknoteIcon,
  ArrowUpDown,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r bg-muted/10 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className,
      )}
    >
      <div className="flex flex-col space-y-6 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center justify-between">
            {!collapsed && <h2 className="text-lg font-semibold">Menu</h2>}
            <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8">
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <nav className="flex flex-col space-y-1 px-3">
          <NavItem href="/" icon={LayoutDashboard} label="Dashboard" collapsed={collapsed} active />
          <NavItem href="/receitas" icon={BanknoteIcon} label="Receitas" collapsed={collapsed} />
          <NavItem href="/despesas" icon={CreditCard} label="Despesas" collapsed={collapsed} />
          <NavItem href="/transacoes" icon={ArrowUpDown} label="Transações" collapsed={collapsed} />
          <NavItem href="/investimentos" icon={LineChart} label="Investimentos" collapsed={collapsed} />
          <NavItem href="/orcamento" icon={Wallet} label="Orçamento" collapsed={collapsed} />
          <NavItem href="/relatorios" icon={BarChart3} label="Relatórios" collapsed={collapsed} />
          <NavItem href="/previsoes" icon={PieChart} label="Previsões" collapsed={collapsed} />

          {!collapsed && <div className="my-2 border-t" />}

          <NavItem href="/configuracoes" icon={Settings} label="Configurações" collapsed={collapsed} />
        </nav>
      </div>
    </div>
  )
}

interface NavItemProps {
  href: string
  icon: React.ElementType
  label: string
  collapsed: boolean
  active?: boolean
}

function NavItem({ href, icon: Icon, label, collapsed, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      <Icon className="h-5 w-5" />
      {!collapsed && <span className="ml-3">{label}</span>}
    </Link>
  )
}
