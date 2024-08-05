import * as sql from '../models/joyas.models.js'
import { formatoHATEOAS } from '../utils/hateoas.js'

export const findAll = async (req, res) => {
  const limits = parseInt(req.query.limit) || 10 // Limite por defecto
  const order_by = req.query.order_by || 'id_ASC' // Orden por defecto
  const page = parseInt(req.query.page) || 1 // Página por defecto

  try {
    const joyas = await sql.findAll({ limits, order_by, page }) // Pasa los parámetros
    const totalJoyas = await sql.countJoyas()

    // Formateo a HATEOAS
    const response = formatoHATEOAS(joyas, totalJoyas, limits)
    res.status(200).json({ status: true, code: 200, data: response })
  } catch (error) {
    res.status(500).json({ status: false, code: 500, message: error.message })
  }
}

export const findAllWithFilters = async (req, res) => {
  const { precio_max, precio_min, categoria, metal } = req.query

  try {
    const joyas = await sql.findAllWithFilters({
      precio_max: precio_max ? parseFloat(precio_max) : undefined,
      precio_min: precio_min ? parseFloat(precio_min) : undefined,
      categoria,
      metal
    })

    const response = formatoHATEOAS(joyas, joyas.length, joyas.length)
    res.status(200).json({ status: true, code: 200, data: response })
  } catch (error) {
    console.error('Error en Búsqueda con filtros:', error)
    res.status(500).json({ status: false, code: 500, message: error.message })
  }
}
