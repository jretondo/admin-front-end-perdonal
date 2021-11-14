import React, { useState, useEffect } from "react"
import UrlNodeServer from '../../api/NodeServer'
import Header from "components/Headers/Header.js"
import {
    Spinner,
    Container,
    Row,
    Col,
    Card,
    CardHeader
} from "reactstrap";
import { Redirect } from "react-router-dom"
import { UseSecureRoutes } from '../../Hooks/UseSecureRoutes'

const Index = () => {
    const [call, setCall] = useState(false)

    const { loadingT, errorT } = UseSecureRoutes(
        UrlNodeServer.routes,
        call
    )

    useEffect(() => {
        setCall(!call)
        // eslint-disable-next-line
    }, [])

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
                <Header />
                <Container className="mt--7" fluid>
                    <Card className="shadow">
                        <CardHeader className="bg-transparent">
                            <Row className="align-items-center">
                                <Col>
                                    <h2 className="mb-0">Panel de Control</h2>
                                </Col>
                            </Row>
                        </CardHeader>
                    </Card>
                </Container>
            </>
        )
    }
}

export default Index;
