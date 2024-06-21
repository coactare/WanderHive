import { Route } from "@angular/router";
import { ViewDashboardComponent } from "./components/view-dashboard/view-dashboard.component";

export const dashboardRoutes: Route[] = [
    {
        path: '',
        component: ViewDashboardComponent
    }
]