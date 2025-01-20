import {CorsOptions} from "cors";

export const configureCors = (): CorsOptions => {
    const allowedIps = (process.env.ALLOWED_IPS || "localhost").split(","); // Получаем список IP из переменной окружения
    const allowedPorts = ["3001", "5173"]; // Укажите разрешённые порты

    return {
        origin: (origin, callback) => {
            if (!origin) {
                // Разрешаем запросы без заголовка Origin (например, из Postman)
                callback(null, true);
                return;
            }

            try {
                const url = new URL(origin); // Парсим origin
                const ip = url.hostname;
                const port = url.port;

                // Проверяем, разрешён ли IP и порт
                if (allowedIps.includes(ip) && (port === "" || allowedPorts.includes(port))) {
                    callback(null, true);
                } else {
                    throw new Error("Not allowed by CORS");
                }
            } catch {
                callback(new Error("Invalid Origin"));
            }
        },
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: ["Content-Type", "Authorization"],
        preflightContinue: false,
        credentials: true,
    };
};