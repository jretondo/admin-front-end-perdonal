import UrlNodeServer from '../../../../api/NodeServer';
import axios from 'axios';
import React, { useState } from 'react'
import {
    Row,
    Col,
    Button,
    Collapse
} from "reactstrap";
import Spinner from 'reactstrap/lib/Spinner';
import swal from 'sweetalert';

const AccordeonContainer = ({
    proyectFolder,
    proyectName
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen);
    const [esperar, setEsperar] = useState(false)

    const deploy = async (folder, branch) => {
        let testApi = `${UrlNodeServer.apiUrl}/${folder}`
        if (branch === "test") {
            testApi = `${UrlNodeServer.apiTestUrl}/${folder}`
        }
        const datos = {
            folder,
            branch
        }
        setEsperar(true)
        await axios.post(UrlNodeServer.deployment, datos, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        })
            .then(() => {
                setTimeout(async () => {
                    await axios.get(testApi)
                        .then(() => {
                            setEsperar(false)
                            swal("Realizado!", `El ${branch} deploy se hizo correctamente!`, "success");
                        })
                        .catch(() => {
                            setEsperar(false)
                            swal("Controle la aplicación!", `El ${branch} deploy se realizó, pero hubo errores!`, "error");
                        })
                }, 1500);
            })
            .catch(() => {
                setEsperar(false)
                swal("Error!", `El ${branch} deploy no se pudo realizar`, "error");
            })
    }

    const probar = async (folder, branch, proyect) => {
        let testApi = `${UrlNodeServer.apiUrl}/${folder}`
        if (branch === "test") {
            testApi = `${UrlNodeServer.apiTestUrl}/${folder}`
        }
        setEsperar(true)
        await axios.get(testApi)
            .then(() => {
                setEsperar(false)
                swal("Funciona!", `La API ${branch} de ${proyect} anda correctamente!`, "success");
            })
            .catch(() => {
                setEsperar(false)
                swal("No funciona!", `La API ${branch} de ${proyect} no anda correctamente!`, "error");
            })
    }

    return (
        <Row style={{ borderBottom: "2px solid red", marginTop: "20px" }}>
            <Col md="12">
                <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>{proyectName}</Button>
                <Collapse isOpen={isOpen}>
                    {
                        esperar ?
                            <>
                                <div style={{ textAlign: "center" }}>
                                    <Spinner type="grow" color="light" /> </div>
                            </> :
                            <>
                                <Row>
                                    <Col md="6" style={{ textAlign: "center" }} >
                                        <Button color="warning" onClick={e => {
                                            e.preventDefault()
                                            deploy(proyectFolder, "test")
                                        }}
                                            style={{ marginBottom: '1rem', width: "200px" }}>Test Deploy</Button>
                                    </Col>
                                    <Col md="6" style={{ textAlign: "center" }} >
                                        <Button color="danger" onClick={e => {
                                            e.preventDefault()
                                            deploy(proyectFolder, "production")
                                        }}
                                            style={{ marginBottom: '1rem', width: "200px" }}>Production Deploy</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="6" style={{ textAlign: "center" }} >
                                        <Button color="primary" onClick={e => {
                                            e.preventDefault()
                                            probar(proyectFolder, "test", proyectName)
                                        }}
                                            style={{ marginBottom: '1rem', width: "200px" }}>Probar API Test</Button>
                                    </Col>
                                    <Col md="6" style={{ textAlign: "center" }} >
                                        <Button color="primary" onClick={e => {
                                            e.preventDefault()
                                            probar(proyectFolder, "production", proyectName)
                                        }}
                                            style={{ marginBottom: '1rem', width: "200px" }}>Probar API Production</Button>
                                    </Col>
                                </Row>
                            </>
                    }

                </Collapse>
            </Col>
        </Row>
    )
}

export default AccordeonContainer