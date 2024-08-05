import db from '../database/db_connect.js'
import format from 'pg-format'

export const findAll = async ({ limits = 10, order_by ='id_ASC', page = 1 }) => {
  const [campo, direccion] = order_by.split('_')
  const offset = Math.abs((page - 1) * limits)

  const validFields = ['id', 'nombre', 'precio']
  const validDirections = ['ASC', 'DESC']

  if (!validFields.includes(campo) || !validDirections.includes(direccion)) {
    throw new Error('Campo o dirección no válidos')
  }

  const query = format('SELECT * FROM inventario ORDER BY %I %s LIMIT %L OFFSET %L', campo, direccion, limits, offset)
  try {
    const result = await db(query)
    return result
  } catch (error) {
    console.error('Error al buscar los datos de inventario:', error)
    throw error
  }
}

export const countJoyas = async () => {
  const query = 'SELECT COUNT(*) FROM inventario;'
  try {
    const result = await db(query)
    return parseInt(result[0].count, 10)
  } catch (error) {
    console.error('Error al contar los datos de inventario:', error)
    throw error
  }
}

export const findAllWithFilters = async ({ precio_max, precio_min, categoria, metal }) => {
  const filters = []
  const values = []

  if (precio_max) {
    filters.push('precio < $' + (values.length + 1))
    values.push(precio_max)
  }

  if (precio_min) {
    filters.push('precio > $' + (values.length + 1))
    values.push(precio_min)
  }

  if (categoria) {
    filters.push('categoria = $' + (values.length + 1))
    values.push(categoria)
  }

  if (metal) {
    filters.push('metal = $' + (values.length + 1))
    values.push(metal)
  }

  const query = format('SELECT * FROM inventario' + (filters.length > 0 ? ' WHERE ' + filters.join(' AND ') : ''))

  console.log('Consulta SQL:', query) // Imprimir la consulta
  console.log('Valores:', values) // Imprimir los valores

  try {
    const result = await db(query, values) // Pasar los valores como un arreglo
    return result
  } catch (error) {
    console.error('Error al buscar las joyas filtradas:', error)
    throw error
  }
}
