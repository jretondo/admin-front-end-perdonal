import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row, Spinner } from 'reactstrap';
import moment from 'moment';
import swal from 'sweetalert';
import axios from 'axios';
import NodeServer from '../../../../../api/NodeServer';
import UrlNodeServer from '../../../../../api/NodeServer';

const FormAddNew = () => {
    let netxMonth = parseInt(moment(new Date()).format("MM")) + 1
    let currentYear = parseInt(moment(new Date()).format("YYYY"))
    if (netxMonth === 13) {
        netxMonth = 1
        currentYear = currentYear + 1
    }
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(true)
    const [nombre, setNombre] = useState("")
    const [tipo, setTipo] = useState(0)
    const [concepto, setConcepto] = useState(0)
    const [mes, setMes] = useState(netxMonth)
    const [year, setyear] = useState(currentYear)
    const [importe, setImporte] = useState(0)
    const [cuotas, setCuotas] = useState(1)
    const [conceptsList, setConceptsList] = useState(<option value={false}>No hay conceptos en los parametros</option>)

    const register = async () => {
        const data = {
            name: nombre,
            type: tipo,
            concept: concepto,
            month: mes,
            year: year,
            dues: cuotas
        }
        setLoading(true)
        await axios.post(NodeServer.monthly.index, data, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            const status = res.data.status
            if (status === 200) {
                swal("Compromiso cargado con éxito!", "", "success")
            } else {
                swal("Hubo un error!", res.data.message, "error")
            }
        }).catch(error => {
            swal("Hubo un error!", error.data.message, "error")
        }).finally(() => {
            setLoading(false)
            reloadData()
        })

        setLoading(true)
    }

    const getConcepts = async () => {
        setLoading1(true)
        await axios.get(`${UrlNodeServer.param.list}?type=${1}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            const respuesta = res.data
            const status = respuesta.status
            if (status === 200) {
                console.log('respuesta :>> ', respuesta);
            } else {
                setConcepto(false)
            }
        }).catch(error => {
            console.log('error :>> ', error);
            setConcepto(false)
            setConceptsList(<option value={false}>No hay conceptos en los parametros</option>)
        }).finally(() => {
            setLoading1(false)
        })
    }

    const reloadData = () => {
        setNombre("")
        setTipo(0)
        setConcepto(0)
        setMes(netxMonth)
        setyear(currentYear)
        setImporte(0)
        setCuotas(1)
        document.getElementById("nameTxt").focus()
    }

    useEffect(() => {
        getConcepts()
    }, [])

    return (
        <Card >
            <CardBody>
                {
                    loading ?
                        <Row>
                            <Col style={{ textAlign: "center" }}>
                                <Spinner color="danger" style={{ width: "200px", height: "200px" }} />
                                <h3 style={{ color: "red", textAlign: "center" }}>Cargando las obligaciones...</h3>
                            </Col>
                        </Row>
                        :
                        <Form onSubmit={e => {
                            e.preventDefault()
                            if (concepto) {
                                register()
                            } else {
                                swal("Sin conceptos!", "No puede cargar movimientos sin relacionarlo con un concepto!", "error")
                            }
                        }}>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label>Nombre</Label>
                                        <Input id="nameTxt" required type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                    </FormGroup>
                                </Col>
                                <Col md="2">
                                    <FormGroup>
                                        <Label>Tipo</Label>
                                        <Input type="select" value={tipo} onChange={e => setTipo(e.target.value)}>
                                            <option value={0}>Egreso</option>
                                            <option value={1}>Ingreso</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label>Concepto</Label>
                                        {loading1 ?
                                            <div style={{ textAlign: "center", padding: "5px", margin: 0, border: "1px solid #cad1d7", borderRadius: "7px" }}>
                                                <Spinner />
                                            </div>
                                            :
                                            <Input required disabled={!concepto} type="select" value={concepto} onChange={e => setConcepto(e.target.value)} >
                                                {conceptsList}
                                            </Input>}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <Row>
                                        <Col md="8">
                                            <FormGroup>
                                                <Label>Mes</Label>
                                                <Input type="select" value={mes} onChange={e => setMes(e.target.value)}>
                                                    <option value={1}>Enero</option>
                                                    <option value={2}>Febrero</option>
                                                    <option value={3}>Marzo</option>
                                                    <option value={4}>Abril</option>
                                                    <option value={5}>Mayo</option>
                                                    <option value={6}>Junio</option>
                                                    <option value={7}>Julio</option>
                                                    <option value={8}>Agosto</option>
                                                    <option value={9}>Septiembre</option>
                                                    <option value={10}>Octubre</option>
                                                    <option value={11}>Noviembre</option>
                                                    <option value={12}>Diciembre</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md="4">
                                            <FormGroup>
                                                <Label>Año</Label>
                                                <Input required min={currentYear} max={2100} type="number" value={year} onChange={e => setyear(e.target.value)} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md="6">
                                    <Row>
                                        <Col md="8">
                                            <FormGroup>
                                                <Label>Importe</Label>
                                                <Input min={0.01} step={0.01} required type="number" value={importe} onChange={e => setImporte(e.target.value)} />
                                            </FormGroup>
                                        </Col>
                                        <Col md="4">
                                            <FormGroup>
                                                <Label>Cuotas</Label>
                                                <Input required min={1} max={50} type="number" value={cuotas} onChange={e => setCuotas(e.target.value)} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12" style={{ textAlign: "center" }}>
                                    <Button type="submit" color="primary" style={{ width: "120px" }}>
                                        Cargar
                                    </Button>
                                    <Button onClick={e => {
                                        e.preventDefault()
                                        reloadData()
                                    }} color="danger" style={{ width: "120px" }}>
                                        Cancelar
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                }

            </CardBody>
        </Card>
    )
}

export default FormAddNew