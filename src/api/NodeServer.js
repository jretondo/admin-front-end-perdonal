require('dotenv').config()

var host = ""
if (process.env.NODE_ENV === "development") {
    host = "http://localhost:3000/api"
} else {
    host = "https://api-prod.nekoadmin.com.ar/jretondo"
}

const user = {
    host: host + "/user",
    sub: {
        getData: host + "/user/get/"
    }
}

const deployment = host + "/deployment"
const certificates = host + "/certificates"
const test = host
const auth = host + "/auth"
const routes = host + "/routes"
const apiTestUrl = "https://api-test.nekoadmin.com.ar"
const apiUrl = "https://api-prod.nekoadmin.com.ar"
const monthlyRoute = host + "/monthly"
const paramRoutes = host + "/param"
const monthly = {
    index: monthlyRoute,
    list: monthlyRoute + "/list"
}
const param = {
    index: paramRoutes,
    list: paramRoutes + "/list"
}


const UrlNodeServer = {
    user,
    auth,
    routes,
    deployment,
    certificates,
    test,
    apiTestUrl,
    apiUrl,
    monthly,
    param
}

export default UrlNodeServer