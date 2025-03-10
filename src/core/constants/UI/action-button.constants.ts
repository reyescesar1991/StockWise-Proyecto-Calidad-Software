import { IActionQuickButton } from "../../models";

export const ACTION_QUICK_BUTTONS :  IActionQuickButton[] = [

    {
        icon: 'fas fa-plus',
        label: 'Nuevo Producto',
        route: '/dashBoard/productos/registrar-producto',
        styleClass : 'primary-button'
      },
      {
        icon: 'fas fa-truck-loading',
        label: 'Registrar Entrada',
        route: '/dashBoard/inventario/agregar-inventario',
        styleClass : 'primary-button'
      },
      {
        icon: 'fas fa-sign-out-alt',
        label: 'Registrar Salida',
        route: '/dashBoard/inventario/registrar-venta',
        styleClass : 'primary-button'
      }
]

export const ACTION_QUICK_BUTTONS_REPORTS :  IActionQuickButton[] = [

    {
        icon: 'fas fa-plus',
        label: 'Ver Reporte de Valor Total',
        route: '/dashBoard/reportes/reporte-total-stock',
        styleClass : 'action-link'
      },
      {
        icon: 'fas fa-arrow-right',
        label: 'Ver Reporte Bajo Stock',
        route: '/dashBoard/reportes/reporte-bajo-stock',
        styleClass : 'action-link'
      },
      {
        icon: 'fas fa-chart-bar',
        label: 'Ver Reporte General',
        route: '/dashBoard/reportes/reporte-general',
        styleClass : 'action-link'
      }
]