import { IActionQuickButton } from "../../models";

export const ACTION_QUICK_BUTTONS :  IActionQuickButton[] = [

    {
        icon: 'fas fa-plus',
        label: 'Nuevo Producto',
        route: '/dashboard/productos/registrar-producto',
        styleClass : 'primary-button'
      },
      {
        icon: 'fas fa-truck-loading',
        label: 'Registrar Entrada',
        route: '/dashboard/inventario/agregar-inventario',
        styleClass : 'primary-button'
      },
      {
        icon: 'fas fa-sign-out-alt',
        label: 'Registrar Salida',
        route: '/dashboard/inventario/registrar-venta',
        styleClass : 'primary-button'
      }
]

export const ACTION_QUICK_BUTTONS_REPORTS :  IActionQuickButton[] = [

    {
        icon: 'fas fa-plus',
        label: 'Ver Reporte de Valor Total',
        route: '/dashboard/reportes/reporte-total-stock',
        styleClass : 'action-link'
      },
      {
        icon: 'fas fa-arrow-right',
        label: 'Ver Reporte Bajo Stock',
        route: '/dashboard/reportes/reporte-bajo-stock',
        styleClass : 'action-link'
      },
      {
        icon: 'fas fa-chart-bar',
        label: 'Ver Reporte General',
        route: '/dashboard/reportes/reporte-general',
        styleClass : 'action-link'
      }
]