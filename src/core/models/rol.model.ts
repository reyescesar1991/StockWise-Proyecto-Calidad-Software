export interface IRol {
    id: number; // Identificador único del rol (puedes usar string o UUID si prefieres)
    nombre: string; // Nombre del rol (ej: "Administrador", "Editor", "Usuario Básico")
    descripcion: string; // Descripción del rol para entender su propósito
    permisos: string[]; // Array de strings que representan los permisos asociados al rol (ej: ["crear_articulo", "editar_usuario", "ver_reportes"])
  }