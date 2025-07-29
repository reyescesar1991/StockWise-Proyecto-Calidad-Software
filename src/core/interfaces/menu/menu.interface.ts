export interface IMenuRequest{

    idUser : string
}

export interface SimplifiedSubroute {
    id: string;
    name: string;
    path: string;
    active: boolean;
    mainRoute : string;
}

export interface RouteWithSubroutes {
  id: string;
  name: string;
  path: string;
  icon: string;
  active: boolean;
  subroutes: SimplifiedSubroute[]; // Array de las subrutas simplificadas
}

export interface IMenuBuildUser{

  id: string;
  title: string;
  routes: RouteWithSubroutes[]; // Array de las subrutas simplificadas
}

export interface IMenuResponse{

    menu : IMenuBuildUser[]
}
