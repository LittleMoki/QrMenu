export class CreateCartDto {
  userId: string;   // ID пользователя
  menuItemId: string; // ID товара из меню
  quantity?: number; // Количество товара, по умолчанию - 1
}
	