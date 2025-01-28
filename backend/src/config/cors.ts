import {CorsOptions} from "cors";

export const configureCors = (): CorsOptions => {
    const allowedIps = (process.env.ALLOWED_IPS || "localhost").split(",");
    const allowedPorts = ["3001", "5173"]; // Разрешённые порты

    return {
        origin: (origin, callback) => {
            if (!origin) {
                // Разрешаем запросы без заголовка Origin (например, из Postman)
                callback(null, true);
                return;
            }

            try {
                const { hostname, port } = new URL(origin);

                console.log(`CORS check: origin=${origin}, hostname=${hostname}, port=${port}`);

                // Разрешаем запросы, если IP/домен в списке и порт разрешён
                if (allowedIps.includes(hostname) && (port === "" || allowedPorts.includes(port))) {
                    callback(null, true);
                } else {
                    console.warn(`CORS blocked: origin=${origin}, hostname=${hostname}, port=${port}`);
                    callback(new Error("Not allowed by CORS"));
                }
            } catch (error) {
                console.error("CORS error parsing origin:", error);
                callback(new Error("Invalid Origin"));
            }
        },
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: ["Content-Type", "Authorization"],
        preflightContinue: false,
        credentials: true,
    };
};