import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Router } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CoderRoute API",
      version: "1.0.0",
      description:
        "A comprehensive coding platform backend API for competitive programming, code execution, and collaborative coding.",
      contact: {
        name: "CoderRoute Team",
        email: "support@coderroute.com",
      },
      license: {
        name: "ISC",
        url: "https://opensource.org/licenses/ISC",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
      {
        url: "https://api.coderroute.officialgopi.xyz",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "access-token",
          description: "JWT token stored in HTTP-only cookie",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "Unique user identifier",
            },
            name: {
              type: "string",
              description: "User's full name",
            },
            username: {
              type: "string",
              description: "Unique username",
            },
            email: {
              type: "string",
              format: "email",
              description: "User's email address",
            },
            avatar: {
              type: "string",
              format: "uri",
              description: "Profile picture URL",
            },
            role: {
              type: "string",
              enum: ["USER", "ADMIN"],
              description: "User role",
            },
            authProvider: {
              type: "string",
              enum: ["GOOGLE", "GITHUB", "LOCAL"],
              description: "Authentication provider",
            },
            isEmailVerified: {
              type: "boolean",
              description: "Email verification status",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Account creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
            },
          },
        },
        Problem: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "Unique problem identifier",
            },
            slug: {
              type: "string",
              description: "URL-friendly problem identifier",
            },
            title: {
              type: "string",
              description: "Problem title",
            },
            description: {
              type: "string",
              description: "Problem description",
            },
            difficulty: {
              type: "string",
              enum: ["EASY", "MEDIUM", "HARD"],
              description: "Problem difficulty level",
            },
            tags: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Problem tags",
            },
            constraints: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Problem constraints",
            },
            hints: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Problem hints",
            },
            editorial: {
              type: "string",
              description: "Problem editorial",
            },
            createdByUserId: {
              type: "string",
              format: "uuid",
              description: "Creator's user ID",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
            },
          },
        },
        TestCase: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Test case ID",
            },
            problemId: {
              type: "string",
              format: "uuid",
              description: "Associated problem ID",
            },
            input: {
              type: "string",
              description: "Test input",
            },
            output: {
              type: "string",
              description: "Expected output",
            },
            explanation: {
              type: "string",
              description: "Test case explanation",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
            },
          },
        },
        Submission: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "Unique submission identifier",
            },
            userId: {
              type: "string",
              format: "uuid",
              description: "Submitter's user ID",
            },
            problemId: {
              type: "string",
              format: "uuid",
              description: "Problem ID",
            },
            sourceCode: {
              type: "string",
              description: "Submitted source code",
            },
            language: {
              type: "string",
              enum: ["PYTHON", "JAVASCRIPT"],
              description: "Programming language",
            },
            stdin: {
              type: "string",
              description: "Standard input",
            },
            stdout: {
              type: "string",
              description: "Standard output",
            },
            stderr: {
              type: "string",
              description: "Standard error",
            },
            compileOutput: {
              type: "string",
              description: "Compilation output",
            },
            status: {
              type: "string",
              description: "Submission status",
            },
            memory: {
              type: "string",
              description: "Memory usage",
            },
            time: {
              type: "string",
              description: "Execution time",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Submission timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
            },
          },
        },
        Sheet: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "Unique sheet identifier",
            },
            name: {
              type: "string",
              description: "Sheet name",
            },
            description: {
              type: "string",
              description: "Sheet description",
            },
            userId: {
              type: "string",
              format: "uuid",
              description: "Creator's user ID",
            },
            isPublic: {
              type: "boolean",
              description: "Public visibility",
            },
            copyFromSheetId: {
              type: "string",
              format: "uuid",
              description: "Original sheet ID (if copied)",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
            },
          },
        },
        Discussion: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "Unique discussion identifier",
            },
            content: {
              type: "string",
              description: "Discussion content",
            },
            userId: {
              type: "string",
              format: "uuid",
              description: "Author's user ID",
            },
            problemId: {
              type: "string",
              format: "uuid",
              description: "Associated problem ID",
            },
            parentId: {
              type: "string",
              format: "uuid",
              description: "Parent discussion ID (for replies)",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
            },
          },
        },
        ApiResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              description: "Request success status",
            },
            message: {
              type: "string",
              description: "Response message",
            },
            data: {
              type: "object",
              description: "Response data",
            },
          },
        },
        ApiError: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
              description: "Request success status",
            },
            message: {
              type: "string",
              description: "Error message",
            },
            errors: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Detailed error information",
            },
            statusCode: {
              type: "integer",
              description: "HTTP status code",
            },
          },
        },
        PaginatedResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
              description: "Request success status",
            },
            message: {
              type: "string",
              description: "Response message",
            },
            data: {
              type: "object",
              properties: {
                items: {
                  type: "array",
                  items: {
                    type: "object",
                  },
                  description: "Array of items",
                },
                pagination: {
                  type: "object",
                  properties: {
                    page: {
                      type: "integer",
                      description: "Current page number",
                    },
                    limit: {
                      type: "integer",
                      description: "Items per page",
                    },
                    total: {
                      type: "integer",
                      description: "Total number of items",
                    },
                    totalPages: {
                      type: "integer",
                      description: "Total number of pages",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
  },
  apis: ["./src/app/features/**/*.route.ts"], // Path to the API files
};

const specs = swaggerJsdoc(options);

const swaggerRouter = Router();

swaggerRouter.use("/", swaggerUi.serve);
swaggerRouter.get(
  "/",
  swaggerUi.setup(specs, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "CoderRoute API Documentation",
  })
);

export { swaggerRouter };
