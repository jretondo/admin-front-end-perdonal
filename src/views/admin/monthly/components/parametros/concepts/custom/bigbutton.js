import React from 'react';
import { Button } from 'reactstrap';

export const BigBitton = ({
    tittle,
    color,
    fn
}) => {
    return (
        <Button color={color} onClick={e => {
            e.preventDefault()
            fn()
        }} style={{ height: "100px", marginTop: "50px" }}>
            {tittle}
        </Button>
    )
}