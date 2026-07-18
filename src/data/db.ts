import type { Category, MenuItem, Table } from "../types"

export const categories: Category[] = [
  { id: 1, name: 'Pizzas', icon: 'local_pizza' },
  { id: 2, name: 'Carnes', icon: 'lunch_dining' },
  { id: 3, name: 'Postres', icon: 'cake' },
  { id: 4, name: 'Bebidas', icon: 'local_bar' },
  { id: 5, name: 'Cafés', icon: 'coffee' },
]

export const menuItems: MenuItem[] = [
  { id: 1, name: 'Pizza a la Leña Chica', price: 30, categoryId: 1 },
  { id: 2, name: 'Pizza a la Leña Mediana', price: 50, categoryId: 1 },
  { id: 3, name: 'Pizza a la Leña Grande', price: 70, categoryId: 1 },
  { id: 4, name: 'Pizza Hawaiana', price: 55, categoryId: 1 },
  { id: 5, name: 'Pizza Pepperoni', price: 55, categoryId: 1 },
  { id: 6, name: 'Rib Eye 800g', price: 100, categoryId: 2 },
  { id: 7, name: 'New York 600g', price: 90, categoryId: 2 },
  { id: 8, name: 'Chuleta de Cerdo', price: 75, categoryId: 2 },
  { id: 9, name: 'Rebanada de Pay de Limón', price: 30, categoryId: 3 },
  { id: 10, name: 'Rebanada de Pastel de Chocolate', price: 30, categoryId: 3 },
  { id: 11, name: 'Rebanada de Pay de Queso', price: 30, categoryId: 3 },
  { id: 12, name: 'Tiramisú', price: 35, categoryId: 3 },
  { id: 13, name: 'Jugo de Naranja', price: 15, categoryId: 4 },
  { id: 14, name: 'Limonada', price: 15, categoryId: 4 },
  { id: 15, name: 'Agua Mineral', price: 10, categoryId: 4 },
  { id: 16, name: 'Tequila', price: 40, categoryId: 4 },
  { id: 17, name: 'Café Americano', price: 20, categoryId: 5 },
  { id: 18, name: 'Café Capuchino', price: 40, categoryId: 5 },
  { id: 19, name: 'Café Espresso', price: 25, categoryId: 5 },
  { id: 20, name: 'Chocolate Caliente', price: 30, categoryId: 5 },
]

export const tables: Table[] = [
  { id: 1, name: 'Mesa 1' },
  { id: 2, name: 'Mesa 2' },
  { id: 3, name: 'Mesa 3' },
  { id: 4, name: 'Mesa 4' },
  { id: 5, name: 'Mesa 5' },
  { id: 6, name: 'Mesa 6' },
  { id: 7, name: 'Terraza 1' },
  { id: 8, name: 'Terraza 2' },
]
