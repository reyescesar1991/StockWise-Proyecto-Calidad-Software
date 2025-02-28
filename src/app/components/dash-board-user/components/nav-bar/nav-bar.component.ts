import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  // Objeto simulado que podría venir del backend
  protected navigationConfig = [
    {
        id: 'principal',
        title: 'Principal',
        routes: [
            {
                id: 'home',
                name: 'Inicio',
                path: '/home',
                icon: 'home-icon',
                active: true
            },
            {
                id: 'dashboard',
                name: 'Dashboard',
                path: '/dashboard',
                icon: 'dashboard-icon',
                active: false
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
                path: '/products',
                icon: 'products-icon',
                active: false,
                subroutes: [
                    {
                        id: 'products-list',
                        name: 'Listado',
                        path: '/products/list',
                        active: false
                    },
                    {
                        id: 'products-create',
                        name: 'Crear producto',
                        path: '/products/create',
                        active: false
                    },
                    {
                        id: 'products-categories',
                        name: 'Categorías',
                        path: '/products/categories',
                        active: false
                    }
                ]
            },
            {
                id: 'inventory-management',
                name: 'Gestión de Stock',
                path: '/inventory',
                icon: 'inventory-icon',
                active: false,
                subroutes: [
                    {
                        id: 'inventory-entries',
                        name: 'Entradas',
                        path: '/inventory/entries',
                        active: false
                    },
                    {
                        id: 'inventory-exits',
                        name: 'Salidas',
                        path: '/inventory/exits',
                        active: false
                    },
                    {
                        id: 'inventory-transfers',
                        name: 'Transferencias',
                        path: '/inventory/transfers',
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
                id: 'sales-reports',
                name: 'Ventas',
                path: '/reports/sales',
                icon: 'reports-icon',
                active: false
            },
            {
                id: 'inventory-reports',
                name: 'Inventario',
                path: '/reports/inventory',
                icon: 'reports-icon',
                active: false
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
                path: '/users',
                icon: 'users-icon',
                active: false,
                subroutes: [
                    {
                        id: 'users-list',
                        name: 'Listado',
                        path: '/users/list',
                        active: false
                    },
                    {
                        id: 'users-roles',
                        name: 'Roles y permisos',
                        path: '/users/roles',
                        active: false
                    }
                ]
            },
            {
                id: 'settings',
                name: 'Configuración',
                path: '/settings',
                icon: 'settings-icon',
                active: false
            }
        ]
    }
];


protected routeInformation: string = '';
protected activeRouteId: string | null = null;
protected isMobileView: boolean = false; // Track mobile view state

constructor(private renderer: Renderer2, private el: ElementRef, private router: Router) { }

ngOnInit(): void {
  this.setupMobileMenuInitialState(); // Set initial mobile menu state on component init
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
    }

    // Reemplazamos toggleClass por la lógica de addClass y removeClass para sidebar
    if (sidebar.classList.contains('collapsed')) {
      this.renderer.removeClass(sidebar, 'collapsed');
    } else {
      this.renderer.addClass(sidebar, 'collapsed');
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

// Angular implementation of setupMobileMenu and resize listener

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
}
