import React from 'react';
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';

const ConceptForm = ({
    group,
    setGroup,
    groupList,
    name,
    setName,
    setConceptsList,
    conceptsList,
    concept,
    setConcept
}) => {
    return (<>
        <Row>
            <Col md="12">
                <h2>nuevo Concepto</h2>
            </Col>
        </Row>
        <Row>
            <Col md="6">
                <Row>
                    <Col md="8">
                        <Col>
                            <FormGroup>
                                <Label>Concepto</Label>
                                <Input required value={name} onChange={e => setName(e.target.value)} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Grupo</Label>
                                <Input required value={name} onChange={e => setName(e.target.value)} />
                            </FormGroup>
                        </Col>
                    </Col>
                    <Col md="4">
                        <Button color={"primary"} style={{ height: "100px", marginTop: "50px" }}>
                            Cargar
                        </Button>
                    </Col>
                </Row>
            </Col>
            <Col md="6">

            </Col>
        </Row>
    </>)
}

export default ConceptForm