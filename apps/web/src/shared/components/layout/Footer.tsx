export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="text-xs font-medium tracking-widest uppercase text-foreground">
          MiTienda
        </span>
        <nav className="flex gap-8">
          <a href="/" className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
            Inicio
          </a>
          <a href="/products" className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
            Productos
          </a>
          <a href="/contact" className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
            Contacto
          </a>
        </nav>
        <span className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} MiTienda
        </span>
      </div>
    </footer>
  )
}
