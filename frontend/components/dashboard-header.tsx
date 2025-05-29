import Link from "next/link"
import { Home, HelpCircle, Mail } from "lucide-react"

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="https://sitetray.s3.amazonaws.com/wp-content/uploads/2023/01/logo_tray_site-svg.png"
              alt="Logo da Tray"
              className="h-8"
            />
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">{/* Menu items can be added here */}</nav>
        <div className="flex items-center space-x-4">
          <Link href="https://www.tray.com.br/" target="_blank" className="text-muted-foreground hover:text-foreground">
            <Home className="h-5 w-5" />
            <span className="sr-only">Home</span>
          </Link>
          <Link
            href="https://www.tray.com.br/faq/"
            target="_blank"
            className="text-muted-foreground hover:text-foreground"
          >
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">FAQ</span>
          </Link>
          <Link
            href="https://www.tray.com.br/contato/"
            target="_blank"
            className="text-muted-foreground hover:text-foreground"
          >
            <Mail className="h-5 w-5" />
            <span className="sr-only">Contato</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
