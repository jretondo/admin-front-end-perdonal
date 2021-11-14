require('dotenv').config()

var host = ""
if (process.env.NODE_ENV === "development") {
    host = "https://api-prod.nekoadmin.com.ar/jretondo"
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

const UrlNodeServer = {
    user,
    auth,
    routes,
    deployment,
    certificates,
    test,
    apiTestUrl,
    apiUrl
}

export default UrlNodeServer