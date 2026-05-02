export class CreateProductDto {
  name: string;
  brand: string;
  price: number;
  stock: number;
  ai_description?: string; // El signo ? indica que es opcional
}
