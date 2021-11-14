import React, { useState, useEffect } from "react"
import UrlNodeServer from '../../api/NodeServer'
import Header from "components/Headers/Header.js"
import {
    Spinner,
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from "reactstrap";
import { Redirect } from "react-router-dom"
import { UseSecureRoutes } from '../../Hooks/UseSecureRoutes'
import AccordeonCont from './Componentes/Accordeon/container'
import axios from "axios";
import AlertaForm from './Componentes/Alertas/Alerta1'

const Index = () => {
    const [call, setCall] = useState(false)
    const [alertar, setAlertar] = useState(false)
    const [msgStrongAlert, setMsgStrong] = useState("")
    const [msgGralAlert, setMsgGralAlert] = useState("")
    const [successAlert, setSuccessAlert] = useState(false)
    const [plantProyects, setPlantProyects] = useState(<></>)
    const { loadingT, errorT } = UseSecureRoutes(
        UrlNodeServer.routes,
        call
    )
    useEffect(() => {
        setCall(!call)
        getProyects()
        // eslint-disable-next-line
    }, [])

    const getProyects = async () => {
        await axios.get(UrlNodeServer.deployment, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        })
            .then(res => {
                const data = res.data
                const status = parseInt(data.status)
                console.log(`data`, data)
                if (status === 200) {
                    const body = data.body
                    setPlantProyects(
                        body.map((item, key) => {
                            return (
                                <AccordeonCont
                                    key={key}
                                    id={key}
                                    proyectFolder={item.folder_name}
                                    proyectName={item.proyect_name}
                                />
                            )
                        })
                    )
                } else {
                    setMsgStrong("No hay proyectos en el repositorio")
                    setMsgGralAlert("")
                    setSuccessAlert(false)
                    setAlertar(!alertar)
                }
            })
            .catch(() => {
                setMsgStrong("No hay proyectos en el repositorio")
                setMsgGralAlert("")
                setSuccessAlert(false)
                setAlertar(!alertar)
            })
    }

    if (loadingT) {
        return (
            <div style={{ textAlign: "center" }}>
                <Spinner type="grow" color="light" /> </div>
        )
    } else if (errorT) {
        return (
            <Redirect
                className="text-light"
                to={process.env.PUBLIC_URL + "/"}
            />
        )
    } else {
        return (
            <>
                <AlertaForm
                    success={successAlert}
                    msgStrong={msgStrongAlert}
                    msgGral={msgGralAlert}
                    alertar={alertar}
                />
                <Header />
                <Container className="mt--7" fluid>
                    <Card className="shadow">
                        <CardHeader className="bg-transparent">
                            <Row className="align-items-center">
                                <Col>
                                    <h2 className="mb-0">Depliegue de Aplicaciones - Backend</h2>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {plantProyects}
                        </CardBody>
                    </Card>
                </Container>
            </>
        )
    }
}

export default Index;
