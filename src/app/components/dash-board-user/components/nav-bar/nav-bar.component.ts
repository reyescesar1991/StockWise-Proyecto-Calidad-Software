import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavbarComponent {

  @Output() hiddenContent = new EventEmitter<string>();
  @Output() showContent = new EventEmitter<string>();
  // Objeto simulado que podría venir del backend
  protected navigationConfig = [
    {
        id: 'principal',
        title: 'Principal',
        routes: [
            {
                id: 'home',
                name: 'Inicio',
                path: '/dashboard/inicio',
                icon: 'home-icon',
                active: true,
                subroutes: [] // Subrutas vacías para consistencia
            }
        ]
    },
    {
        id: 'inventory',
        title: 'Inventario',
        routes: [
            {
                id: 'products',
                name: 'Productos',
                path: '/dashboard/productos',
                icon: 'products-icon',
                active: false,
                subroutes: [
                    {
                        id: 'products-registry',
                        name: 'Registrar producto',
                        path: '/dashboard/productos/registrar-producto',
                        active: false
                    },
                    {
                        id: 'products-modify',
                        name: 'Modificar producto',
                        path: '/dashboard/productos/modificar-producto',
                        active: false
                    },
                    {
                        id: 'products-list',
                        name: 'Listado de productos',
                        path: '/dashboard/productos/lista-productos',
                        active: false
                    },
                    {
                        id: 'products-search',
                        name: 'buscar producto',
                        path: '/dashboard/productos/buscar-producto',
                        active: false
                    }
                ]
            },
            {
                id: 'inventory-management',
                name: 'Gestión de Stock',
                path: '/dashboard/inventario',
                icon: 'inventory-icon',
                active: false,
                subroutes: [
                    {
                        id: 'inventory-add',
                        name: 'Agregar inventario',
                        path: '/dashboard/inventario/agregar-inventario',
                        active: false
                    },
                    {
                        id: 'inventory-sales',
                        name: 'Registrar venta',
                        path: '/dashboard/inventario/registrar-venta',
                        active: false
                    },
                    {
                        id: 'inventory-adjust',
                        name: 'Ajustar producto',
                        path: '/dashboard/inventario/ajustar-producto',
                        active: false
                    },
                    {
                        id: 'inventory-search',
                        name: 'buscar producto',
                        path: '/dashboard/inventario/buscar-producto',
                        active: false
                    }
                ]
            }
        ]
    },
    {
        id: 'reports',
        title: 'Reportes',
        routes: [
            {
                id: 'general-reports',
                name: 'Reportes',
                path: '/dashboard/reportes',
                icon: 'reports-icon',
                active: false,
                subroutes: [
                    {
                        id: 'report-general',
                        name: 'Estado general',
                        path: '/dashboard/reportes/reporte-general',
                        active: false
                    },
                    {
                        id: 'report-low-stock',
                        name: 'bajo stock',
                        path: '/dashboard/reportes/reporte-bajo-stock',
                        active: false
                    },
                    {
                        id: 'report-total-stock',
                        name: 'Valor total inventario',
                        path: '/dashboard/reportes/reporte-total-stock',
                        active: false
                    }
                ]
            }
        ]
    },
    {
        id: 'admin',
        title: 'Administración',
        routes: [
            {
                id: 'users',
                name: 'Usuarios',
                path: '/dashboard/usuarios',
                icon: 'users-icon',
                active: false,
                subroutes: [
                    {
                        id: 'users-create',
                        name: 'Crear usuario',
                        path: '/dashboard/usuarios/crear-usuario',
                        active: false
                    },
                    {
                        id: 'users-update',
                        name: 'Modificar usuario',
                        path: '/dashboard/usuarios/modificar-usuario',
                        active: false
                    },
                    {
                        id: 'users-list',
                        name: 'Listar usuarios',
                        path: '/dashboard/usuarios/listar-usuarios',
                        active: false
                    }
                ]
            },
            {
                id: 'settings',
                name: 'Configuración',
                path: '/settings',
                icon: 'settings-icon',
                active: false,
                subroutes: [] // Mantenemos subroutes vacío para consistencia
            }
        ]
    }
];


protected routeInformation: string = '';
protected activeRouteId: string | null = null; //ruta activa para remarcarla
protected isMobileView: boolean = false;

constructor(private readonly renderer: Renderer2, private readonly el: ElementRef, private readonly router: Router) { }

ngOnInit(): void {
  this.setupMobileMenuInitialState();
}

toggleSidebar(): void {
  const sidebarContent = this.el.nativeElement.querySelector('#sidebarContent');
  const menuArrow = this.el.nativeElement.querySelector('#menuArrow');
  const sidebar = this.el.nativeElement.querySelector('#sidebar');

  if (sidebarContent && menuArrow && sidebar) {
    // Reemplazamos toggleClass por la lógica de addClass y removeClass para sidebarContent
    if (sidebarContent.classList.contains('show')) {
      this.renderer.removeClass(sidebarContent, 'show');
    } else {
      this.renderer.addClass(sidebarContent, 'show');
    }

    // Reemplazamos toggleClass por la lógica de addClass y removeClass para menuArrow
    if (menuArrow.classList.contains('open')) {
      this.renderer.removeClass(menuArrow, 'open');
    } else {
      this.renderer.addClass(menuArrow, 'open');
      this.sendDisplayHidden();
    }

    // Reemplazamos toggleClass por la lógica de addClass y removeClass para sidebar
    if (sidebar.classList.contains('collapsed')) {
      this.renderer.removeClass(sidebar, 'collapsed');
    } else {
      this.renderer.addClass(sidebar, 'collapsed');
      this.sendDisplayShow();
    }
  }
}



toggleSubroutes(event: Event): void { /* ... your toggleSubroutes method ... */ }

onSubrouteClick(subroute: any, route: any): void {
  this.setActiveRoute(subroute.id);
  this.updateRouteInfo(route.name + ' / ' + subroute.name);
  // Optionally navigate if needed: this.router.navigate([subroute.path]);
}

onNavLinkClick(event: Event, route: any): void {
  event.preventDefault(); // Prevent default link behavior

  this.setActiveRoute(route.id);
  this.updateRouteInfo(route.name);

  if (route.subroutes && route.subroutes.length > 0) {
    const navLinkElement = event.currentTarget as HTMLElement;
    const subroutesElement = navLinkElement.nextElementSibling as HTMLElement;
    const chevronElement = navLinkElement.querySelector('.chevron-down') as HTMLElement;

    if (subroutesElement && chevronElement) {
      if (subroutesElement.classList.contains('open')) {
        this.renderer.removeClass(subroutesElement, 'open');
      } else {
        this.renderer.addClass(subroutesElement, 'open');
      }

      if (chevronElement.classList.contains('open')) {
        this.renderer.removeClass(chevronElement, 'open');
      } else {
        this.renderer.addClass(chevronElement, 'open');
      }
    }
  } else {
    // No subroutes logic...
    // Optionally navigate if needed: this.router.navigate([route.path]);
  }
}

updateRouteInfo(routeName: string): void {
  this.routeInformation = routeName;
}

setActiveRoute(routeId: string): void {
  this.activeRouteId = routeId;

  const navLinks = this.el.nativeElement.querySelectorAll('.nav-link, .subroute-link');

  navLinks.forEach((linkElement: HTMLElement) => {
    this.renderer.removeClass(linkElement, 'active');
  });

  const targetRoute = this.el.nativeElement.querySelector(`[data-route-id="${routeId}"]`) as HTMLElement;

  if (targetRoute) {
    this.renderer.addClass(targetRoute, 'active');

    if (targetRoute.classList.contains('subroute-link')) {
      const parentMenu = targetRoute.closest('.subroutes') as HTMLElement;
      if (parentMenu) {
        this.renderer.addClass(parentMenu, 'open');

        const parentLink = parentMenu.previousElementSibling as HTMLElement;
        if (parentLink) {
          const chevron = parentLink.querySelector('.chevron-down') as HTMLElement;
          if (chevron) {
            this.renderer.addClass(chevron, 'open');
          }
        }
      }
    }
  }
}


setupMobileMenuInitialState(): void {
  this.isMobileView = window.innerWidth <= 768;
  const sidebar = this.el.nativeElement.querySelector('#sidebar');
  const sidebarContent = this.el.nativeElement.querySelector('#sidebarContent');

  if (sidebar && sidebarContent) {
    if (this.isMobileView) {
      this.renderer.addClass(sidebar, 'collapsed');
      this.renderer.removeClass(sidebarContent, 'show');
    } else {
      this.renderer.removeClass(sidebar, 'collapsed');
      this.renderer.addClass(sidebarContent, 'show');
    }
  }
}

@HostListener('window:resize', ['$event'])
onResize(event: any): void {
  this.isMobileView = window.innerWidth <= 768;
  const sidebar = this.el.nativeElement.querySelector('#sidebar');
  const sidebarContent = this.el.nativeElement.querySelector('#sidebarContent');

  if (sidebar && sidebarContent) {
    if (this.isMobileView) {
      this.renderer.addClass(sidebar, 'collapsed');
      this.renderer.removeClass(sidebarContent, 'show');
    } else {
      this.renderer.removeClass(sidebar, 'collapsed');
      this.renderer.addClass(sidebarContent, 'show');
    }
  }
}

sendDisplayHidden(): void {
  this.hiddenContent.emit("hidden");
}

sendDisplayShow() : void{

  this.showContent.emit("show");
}
}
