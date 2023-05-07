import { ProductVariant } from "../model/ProductVariant";
import Http from "../utils/http";
import { Size } from "../model/Size";
import { Color } from "../model/Color";

const http = new Http("http://localhost:3002/inventory").instance;
export const getProductVariantByProductId = (id: string) =>
  http.get<ProductVariant[]>(`getProductVariantByProductId/${id}`)

export const getAllSize = () => http.get<Size[]>(`size/all`)
export const getAllColor = () => http.get<Color[]>(`color/all`)
export const addColor = (color: Omit<Color, 'id'>) => http.post<Color>('color', color)
export const addSize = (size: Omit<Size, 'id'>) => http.post<Size>('size', size)
export const deleteSize = (id: number) => http.delete(`size/${id}`)
export const deleteColor = (id: number) => http.delete(`color/${id}`)