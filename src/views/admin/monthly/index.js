import Header from 'components/Headers/Header';
import React, { useState } from 'react';
import { ButtonGroup, Card, CardBody, Col, Collapse, Container, Row, Spinner } from 'reactstrap';
import { Redirect } from "react-router-dom"
import { UseSecureRoutes } from '../../../Hooks/UseSecureRoutes'
import UrlNodeServer from '../../../api/NodeServer'
import ButtonOpenCollapse from './customControls';
import { useWindowSize } from 'Hooks/UseWindowSize';
import FormAddNew from './components/formAddNew';


const Montly = () => {
    const [call, setCall] = useState(false)
    const [moduleActive, setModuleActive] = useState(0)
    const { loadingT, errorT } = UseSecureRoutes(
        UrlNodeServer.routes,
        call
    )
    const width = useWindowSize()

    if (loadingT) {
        return (
            <div style={{ textAlign: "center" }}  >
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
                <Header />
                <Container className="mt--7" fluid>
                    <div style={{ width: "100%" }}>
                        <Card style={{ marginTop: "5px", marginBottom: "10px" }}>
                            <CardBody style={{ textAlign: "center" }}>
                                <Row >
                                    <Col style={{ textAlign: "center" }}>
                                        <ButtonGroup vertical={width > 1030 ? false : true}>
                                            <ButtonOpenCollapse
                                                action={() => setModuleActive(0)}
                                                tittle={"Cargar Compromisos"}
                                                active={moduleActive === 0 ? true : false}
                                            />
                                            <ButtonOpenCollapse
                                                action={() => setModuleActive(1)}
                                                tittle={"Pagos por mes"}
                                                active={moduleActive === 1 ? true : false}
                                            />
                                            <ButtonOpenCollapse
                                                action={() => setModuleActive(2)}
                                                tittle={"Reportes"}
                                                active={moduleActive === 2 ? true : false}
                                            />
                                            <ButtonOpenCollapse
                                                action={() => setModuleActive(3)}
                                                tittle={"Parametros"}
                                                active={moduleActive === 2 ? true : false}
                                            />
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>

                        <Collapse isOpen={moduleActive === 0 ? true : false} >
                            <FormAddNew />
                        </Collapse>

                        <Collapse isOpen={moduleActive === 1 ? true : false} >

                        </Collapse>

                        <Collapse isOpen={moduleActive === 2 ? true : false} >

                        </Collapse>
                        <Collapse isOpen={moduleActive === 3 ? true : false} >

                        </Collapse>
                    </div>
                </Container>
            </>
        )
    }
}

export default Montly