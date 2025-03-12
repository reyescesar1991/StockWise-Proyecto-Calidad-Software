import { IPermissionsModel } from "../../models";

export const PERMISSIONS_LIST: IPermissionsModel[] = [
    {
      label: "Ver inventario",
      permission: "ver_inventario",
      can: false
    },
    {
      label: "Registrar entradas",
      permission: "registrar_entrada_stock",
      can: false
    },
    {
      label: "Registrar salidas",
      permission: "registrar_salida_stock",
      can: false
    },
    {
      label: "Ajustar stock",
      permission: "ajustar_stock",
      can: false
    },
    {
      label: "Gestionar categorías",
      permission: "gestionar_categorias",
      can: false
    },
    {
      label: "Gestionar proveedores",
      permission: "gestionar_proveedores",
      can: false
    },
    {
      label: "Informes básicos",
      permission: "generar_informes_basicos",
      can: false
    },
    {
      label: "Informes avanzados",
      permission: "generar_informes_avanzados",
      can: false
    },
    {
      label: "Analizar stock",
      permission: "analizar_stock",
      can: false
    }
  ];