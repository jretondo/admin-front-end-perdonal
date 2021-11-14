import Index from "views/admin/dashboard"
import deployment from 'views/admin/deployment'
import certificates from 'views/admin/certificates'

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-blue",
    component: Index,
    layout: process.env.PUBLIC_URL + "/admin"
  },
  {
    path: "/deployment",
    name: "Deployment",
    icon: "ni ni-tv-2 text-red",
    component: deployment,
    layout: process.env.PUBLIC_URL + "/admin"
  },
  {
    path: "/certificates",
    name: "Certificates",
    icon: "ni ni-tv-2 text-cyan",
    component: certificates,
    layout: process.env.PUBLIC_URL + "/admin"
  }
];
export default routes;
