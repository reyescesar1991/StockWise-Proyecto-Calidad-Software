export interface IActionQuickButton{

    icon: string;
    label: string;
    route: string;
    disabled ?: boolean;
    permissions ?: string[];
    styleClass?: string;  
}