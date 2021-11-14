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
    CardBody,
    FormGroup,
    Input,
    Label
} from "reactstrap";
import { Redirect } from "react-router-dom"
import { UseSecureRoutes } from '../../Hooks/UseSecureRoutes'
import axios from "axios";
import AlertaForm from './Componentes/Alertas/Alerta1'
import moment from "moment";

const Index = () => {
    const [call, setCall] = useState(false)
    const [alertar, setAlertar] = useState(false)
    const [msgStrongAlert, setMsgStrong] = useState("")
    const [msgGralAlert, setMsgGralAlert] = useState("")
    const [successAlert, setSuccessAlert] = useState(false)
    const [botonera, setBotonera] = useState(<></>)
    const [carpeta, setCarpeta] = useState("")
    const [crt, setCrt] = useState("")
    const [key, setKey] = useState("")
    const [copied1, setCopied1] = useState(false)
    const [copied2, setCopied2] = useState(false)
    const [loading, setLoading] = useState(0)
    const [proceso, setProceso] = useState("")

    const { loadingT, errorT } = UseSecureRoutes(
        UrlNodeServer.routes,
        call
    )

    useEffect(() => {
        setCall(!call)
        VerCarpetas()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (copied1) {
            setTimeout(() => {
                setCopied1(false)
            }, 2500);
        }
    }, [copied1])

    useEffect(() => {
        if (copied2) {
            setTimeout(() => {
                setCopied2(false)
            }, 2500);
        }
    }, [copied2])

    const VerCarpetas = async () => {
        setLoading(1)
        await axios.get(UrlNodeServer.certificates, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        })
            .then(res => {
                setLoading(0)
                const respuesta = res.data
                const status = parseInt(respuesta.status)
                if (status === 200) {
                    const folderList = respuesta.body
                    setBotonera(
                        // eslint-disable-next-line
                        folderList.map((item, key) => {
                            const today = new Date()
                            const nearby = moment(item.vto, "DD/MM/YYYY").subtract(1, 'M');
                            let classBtn = "btn btn-primary"
                            let styleText = { color: "green", fontWeight: "bold" }
                            if (today >= item.rawVto) {
                                classBtn = "btn btn-danger"
                                styleText = { color: "red", fontWeight: "bold" }
                            } else if (today >= nearby) {
                                classBtn = "btn btn-warning"
                                styleText = { color: "orange", fontWeight: "bold" }
                            }
                            return (
                                <Col md="4" key={key} style={{ textAlign: "center", padding: "25px" }} >
                                    <FormGroup>
                                        <Label for="exampleEmail" style={styleText} >Vto.: {item.vto}</Label>
                                        <br />
                                        <button
                                            className={classBtn}
                                            onClick={e => {
                                                e.preventDefault();
                                                getCrtKey(item.folder)
                                            }}
                                        >
                                            {item.folder}
                                        </button>
                                    </FormGroup>

                                </Col>
                            )
                        })
                    )
                } else {
                    setMsgStrong("Hubo un error! ")
                    setMsgGralAlert("Puede que no haya carpetas con certificados.")
                    setSuccessAlert(false)
                    setAlertar(!alertar)
                }
            })
            .catch(() => {
                setLoading(0)
                setMsgStrong("Hubo un error! ")
                setMsgGralAlert("Puede que no haya carpetas con certificados.")
                setSuccessAlert(false)
                setAlertar(!alertar)
            })
    }

    const getCrtKey = async (folder) => {
        setCarpeta(folder)
        setCopied1(false)
        setCopied2(false)
        setLoading(2)
        setProceso("Obteniendo certificado y llave de " + folder)
        await axios.get(`${UrlNodeServer.certificates}/cert/?folder=${folder}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        })
            .then(res => {
                setLoading(0)
                const respuesta = res.data
                const status = parseInt(respuesta.status)
                if (status === 200) {
                    setCrt(respuesta.body.cert)
                    setKey(respuesta.body.key)
                    console.log(`object`, respuesta.body.vto)
                } else {
                    setMsgStrong("Hubo un error! ")
                    setMsgGralAlert("")
                    setSuccessAlert(false)
                    setAlertar(!alertar)
                }
            })
            .catch(() => {
                setLoading(0)
                setMsgStrong("Hubo un error! ")
                setMsgGralAlert("")
                setSuccessAlert(false)
                setAlertar(!alertar)
            })
    }

    const copiarCrt = () => {
        setCopied1(true)
        navigator.clipboard.writeText(crt)
        setMsgStrong("Certificado copiado con éxito! ")
        setMsgGralAlert("")
        setSuccessAlert(true)
        setAlertar(!alertar)
    }

    const copiarKey = () => {
        setCopied2(true)
        navigator.clipboard.writeText(key)
        setMsgStrong("Llave copiado con éxito! ")
        setMsgGralAlert("")
        setSuccessAlert(true)
        setAlertar(!alertar)
    }

    const renovarCert = async (folder) => {
        setProceso("Renovando el certificado de " + folder)
        setLoading(2)
        await axios.get(`${UrlNodeServer.certificates}/renew/?folder=${folder}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        })
            .then(res => {
                setLoading(0)
                const respuesta = res.data
                const status = parseInt(respuesta.status)
                if (status === 200) {
                    setMsgStrong("Certificado renovado con éxito! ")
                    setMsgGralAlert("")
                    setSuccessAlert(true)
                    setAlertar(!alertar)
                    getCrtKey(carpeta)
                    VerCarpetas()
                } else {
                    setMsgStrong("Hubo un error! ")
                    setMsgGralAlert("")
                    setSuccessAlert(false)
                    setAlertar(!alertar)
                }
            })
            .catch(() => {
                setLoading(0)
                setMsgStrong("Hubo un error! ")
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
                    <Card className="shadow" style={loading > 1 ? { display: "none" } : {}} >
                        {
                            loading === 1 ?
                                <div style={{ textAlign: "center" }}>
                                    <h3 style={{ textAlign: "center" }}>Consultando certificados...</h3>
                                    <Spinner type="grow" color="primary" style={{ height: "100px", width: "100px" }} /> </div> :
                                <>
                                    <CardHeader className="bg-transparent">
                                        <Row className="align-items-center">
                                            <Col>
                                                <h2 className="mb-0">Certificados Digitales y Keys - Backend  </h2>
                                                <button
                                                    className="btn btn-warning"
                                                    style={{ position: "absolute", right: 0, top: "-10px" }}
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        VerCarpetas();
                                                    }}
                                                >
                                                    <i className="fas fa-redo-alt"></i>
                                                </button>
                                            </Col>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            {botonera}
                                        </Row>
                                    </CardBody>
                                </>
                        }
                    </Card>
                    <Card className="shadow" style={carpeta === "" ? { display: "none" } : { marginTop: "30px" }} >
                        {
                            loading === 2 ?
                                <div style={{ textAlign: "center" }}>
                                    <h3 style={{ textAlign: "center" }}>{proceso}</h3>
                                    <Spinner type="grow" color="primary" style={{ height: "100px", width: "100px" }} /> </div> :
                                <>
                                    <CardHeader className="bg-transparent">
                                        <Row>
                                            <Col md="12" >
                                                <h1 style={{ textAlign: "center", color: "#ca2f00" }} >
                                                    {carpeta}
                                                    <button
                                                        className="btn btn-primary"
                                                        style={{ marginLeft: "30px", position: "absolute" }}
                                                        onClick={e => {
                                                            e.preventDefault();
                                                            renovarCert(carpeta);
                                                        }}
                                                    >
                                                        Renovar Certificado
                                                    </button> </h1>
                                            </Col>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col md="6" >
                                                <h2 style={{ textAlign: "center" }} >Certificado</h2>
                                                <FormGroup>
                                                    <button
                                                        className={copied1 ? "btn btn-success" : "btn btn-danger"}
                                                        onClick={e => {
                                                            e.preventDefault();
                                                            copiarCrt();
                                                        }}
                                                    >
                                                        {copied1 ? "Copiado!" : "Copiar"}
                                                    </button>
                                                    <Input type="textarea" value={crt} style={{ height: "500px" }} disabled />
                                                </FormGroup>
                                            </Col>
                                            <Col md="6" >
                                                <h2 style={{ textAlign: "center" }} >Llave</h2>
                                                <FormGroup>
                                                    <button
                                                        className={copied2 ? "btn btn-success" : "btn btn-danger"}
                                                        onClick={e => {
                                                            e.preventDefault();
                                                            copiarKey();
                                                        }}
                                                    >
                                                        {copied2 ? "Copiado!" : "Copiar"}
                                                    </button>
                                                    <Input type="textarea" value={key} style={{ height: "500px" }} disabled />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </>
                        }
                    </Card>
                    <Card className="shadow" style={{ marginTop: "30px" }} >
                        {
                            loading === 3 ?
                                <div style={{ textAlign: "center" }}>
                                    <h3 style={{ textAlign: "center" }}>Agregando nuevo certificado...</h3>
                                    <Spinner type="grow" color="primary" style={{ height: "100px", width: "100px" }} /> </div> :
                                <>
                                    <CardHeader className="bg-transparent">
                                        <Row>
                                            <Col md="12" >
                                                <h1 style={{ textAlign: "center", color: "#ca2f00" }} >Nuevo certificado digital</h1>
                                            </Col>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col md="12" >

                                            </Col>
                                        </Row>
                                    </CardBody>
                                </>
                        }
                    </Card>
                </Container>
            </>
        )
    }
}

export default Index;
