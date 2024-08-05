export const formatoHATEOAS = (joyas) => {
  const results = joyas.map((joya) => ({
    id: joya.id,
    name: joya.nombre,
    href: `/joyas/${joya.id}`,
    links: {
      self: { href: `/joyas/${joya.id}` },
      categoria: { href: `/categorias/${joya.categoria}` },
      metal: { href: `/marcas/${joya.metal}` },
      precio: { href: `/precio/${joya.precio}` }
    }
  }))
  return {
    total: joyas.length,
    results
  }
}
