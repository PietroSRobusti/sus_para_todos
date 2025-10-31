import bcrypt from "bcryptjs";
import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { storage } from "./storage"; // para buscar o usuário e checar role

// =============================
// Validação de senha forte
// =============================
export const passwordSchema = z
  .string()
  .min(8, "A senha deve ter no mínimo 8 caracteres")
  .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
  .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
  .regex(/[0-9]/, "A senha deve conter pelo menos um número")
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "A senha deve conter pelo menos um caractere especial"
  );

// =============================
// Hash e verificação de senha
// =============================
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// =============================
// Validador de força de senha
// =============================
export function validateStrongPassword(password: string): {
  valid: boolean;
  errors: string[];
} {
  const result = passwordSchema.safeParse(password);

  if (result.success) {
    return { valid: true, errors: [] };
  }

  return {
    valid: false,
    errors: result.error.errors.map((e) => e.message),
  };
}

// =============================
// Middleware requireAuth
// =============================
export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session.userId) {
    return res
      .status(401)
      .json({ error: "Não autenticado. Faça login para continuar." });
  }
  next();
}

// =============================
// Middleware requireAdmin
// =============================
// Bloqueia acesso para quem não for admin
export async function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // precisa estar autenticado
    if (!req.session?.userId) {
      return res.status(401).json({ error: "Não autenticado" });
    }

    const user = await storage.getUserById(req.session.userId);
    if (!user) {
      return res.status(401).json({ error: "Não autenticado" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ error: "Acesso negado. Permissão de administrador necessária." });
    }

    // passou: segue para rota
    next();
  } catch (err: any) {
    console.error("[requireAdmin] Error:", err.message);
    return res
      .status(500)
      .json({ error: "Erro interno de autorização" });
  }
}
