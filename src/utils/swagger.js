const { patch } = require("../routes/userRoute");

const swaggerDocumentation = {
    openapi: "3.0.0",
    info: {
        title: "Demo",
        version: "0.0.1",
        description: "This is a user backend project",
    },
    servers: [
        {
            url: "http://localhost:5000/api/v1/users",
            description: "Local Dev",
        },
        {
            url: "https://girma-bwi-api-v1.onrender.com/",
            description: "Host Dev",
        }
    ],
    tags: [
        {
            name: "User",
            description: "User Routes",
        },
        {
            name: "Admin",
            description: "Admin Routes",
        },
    ],
    paths: {
        "/admin": {
            post: {
                tags: ["Admin"],
                summary: "Register a new admin",
                requestBody: {
                    required: true,
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: "object",
                                properties: {
                                    profile_image: {
                                        type: "string",
                                        format: "binary",
                                    },
                                    name: {
                                        type: "string",
                                    },
                                    email: {
                                        type: "string",
                                    },
                                    phone: {
                                        type: "string",
                                    },
                                    password: {
                                        type: "string",
                                    },
                                },
                                required: ["profile_image", "name", "email", "phone", "password"],
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Admin registered successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                user: {
                                                    $ref: "#/components/schemas/User",
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: "Bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: "Internal server error",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/signup": {
            post: {
                tags: ["User"],
                summary: "Register a new user",
                requestBody: {
                    required: true,
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: "object",
                                properties: {
                                    profile_image: {
                                        type: "string",
                                        format: "binary",
                                    },
                                    name: {
                                        type: "string",
                                    },
                                    email: {
                                        type: "string",
                                    },
                                    phone: {
                                        type: "string",
                                    },
                                    password: {
                                        type: "string",
                                    },
                                },
                                required: ["profile_image", "name", "email", "phone", "password"],
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "User registered successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                user: {
                                                    $ref: "#/components/schemas/User",
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: "Bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: "Internal server error",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/login": {
            post: {
                tags: ["User"],
                summary: "User login",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    emailOrPhone: {
                                        type: "string",
                                    },
                                    password: {
                                        type: "string",
                                    },
                                },
                                required: ["emailOrPhone", "password"],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Success",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                        },
                                        token: {
                                            type: "string",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                user: {
                                                    $ref: "#/components/schemas/User",
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    401: {
                        description: "Incorrect email/phone or password",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: "Internal server error",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/updateMe/{userId}": {
            patch: {
                tags: ["User"],
                summary: "Update user profile",
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        description: "ID of the user to update",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                requestBody: {
                    required: false,
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: "object",
                                properties: {
                                    name: {
                                        type: "string",
                                    },
                                    profile_image: {
                                        type: "string",
                                        format: "binary",
                                    },
                                },
                            },
                        },
                    },
                },
                security: [
                    {
                        BearerAuth: [],
                    },
                ],
                responses: {
                    200: {
                        description: "User profile updated successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: "Bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    403: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    404: {
                        description: "User not found",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: "Internal server error",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/deleteMe/{userId}": {
            delete: {
                tags: ["User"],
                summary: "Delete user account",
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        description: "ID of the user to delete",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                security: [
                    {
                        BearerAuth: [],
                    },
                ],
                responses: {
                    200: {
                        description: "User account deleted successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    403: {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    404: {
                        description: "User not found",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: "Internal server error",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },

        "/me": {
            get: {
                tags: ["User"],
                summary: "Get current user",
                security: [
                    {
                        BearerAuth: [],
                    },
                ],
                responses: {
                    200: {
                        description: "Get current user successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                user: {
                                                    $ref: "#/components/schemas/User",
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: "Internal server error",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/": {
            get: {
                tags: ["User"],
                summary: "Get all users",
                security: [
                    {
                        BearerAuth: [],
                    },
                ],
                responses: {
                    200: {
                        description: "Get users successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                users: {
                                                    type: "array",
                                                    items: {
                                                        $ref: "#/components/schemas/User",
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: {
                        description: "Internal server error",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: {
                                            type: "string",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    components: {
        schemas: {
            User: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        format: "int64",
                    },
                    email: {
                        type: "string",
                    },
                    phone: {
                        type: "string",
                    },
                    password: {
                        type: "string",
                    },
                    profile_image: {
                        type: "string",
                    },
                    name: {
                        type: "string",
                    },
                },
            },
        },
        securitySchemes: {
            BearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
};

module.exports = swaggerDocumentation;

module.exports = swaggerDocumentation;