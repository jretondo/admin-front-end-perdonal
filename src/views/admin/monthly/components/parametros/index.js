import React, { useState } from 'react';
import { Card, CardBody, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import ConceptForm from './concepts';
import GroupsForm from './groups';

const ParametrosMod = () => {
    const [selectMod, setSelectMod] = useState()
    const [name, setName] = useState("")
    const [group, setGroup] = useState(0)
    const [concept, setConcept] = useState(0)
    const [groupList, setGroupList] = useState([])
    const [conceptsList, setConceptsList] = useState([])
    return (
        <>
            <Card >
                <CardBody>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label>
                                    Tipo de parametro
                                </Label>
                                <Input type="select" onChange={e => setSelectMod(e.target.value)} value={selectMod}>
                                    <option value={0}>
                                        Conceptos
                                    </option>
                                    <option value={1}>
                                        Grupos
                                    </option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Card style={{ marginTop: "10px" }} >
                <CardBody>
                    {
                        parseInt(selectMod) === 0 ?
                            <ConceptForm
                                group={group}
                                setGroup={setGroup}
                                groupList={groupList}
                                name={name}
                                setName={setName}
                                setConceptsList={setConceptsList}
                                conceptsList={conceptsList}
                                concept={concept}
                                setConcept={setConcept}
                            /> :
                            <GroupsForm
                                group={group}
                                setGroup={setGroup}
                                groupList={groupList}
                                setGroupList={setGroupList}
                                name={name}
                                setName={setName}
                            />
                    }
                </CardBody>
            </Card>
        </>
    )
}

export default ParametrosMod