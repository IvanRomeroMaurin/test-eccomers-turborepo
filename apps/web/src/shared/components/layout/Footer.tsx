export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-semibold text-gray-900">MiTienda</span>
        <nav className="flex gap-6 text-sm text-gray-500">
          <a href="/" className="hover:text-gray-900 transition-colors">Inicio</a>
          <a href="/products" className="hover:text-gray-900 transition-colors">Productos</a>
          <a href="/contact" className="hover:text-gray-900 transition-colors">Contacto</a>
        </nav>
        <span className="text-sm text-gray-400">
          © {new Date().getFullYear()} MiTienda. Todos los derechos reservados.
        </span>
      </div>
    </footer>
  )
}
