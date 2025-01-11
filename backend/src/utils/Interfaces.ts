
// Интерфейс для пользовательских ошибок
export class CustomError extends Error {
    code?: number;
    status?: number;
}