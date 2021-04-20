import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { activateAuthLayout } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { create_comprobante_bien } from './../../helpers/fetch'


class ComprobanteEntrada extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event, values) {
        values.subtotal = Number(values.subtotal)
        values.numero = Number(values.numero)
        values.unidad = parseInt(values.unidad)
        values.cantidad = parseInt(values.cantidad)
        values.valor_unitario = Number(values.valor_unitario)
        values.porcentaje_iva = Number(values.porcentaje_iva)
        values.total_iva = Number(values.total_iva)
        values.total_cantidad_entrada = Number(values.total_cantidad_entrada)
        values.subtotal_grupo = Number(values.subtotal_grupo)
        values.total_entrada = Number(values.total_entrada)
        values.total_cantidad = Number(values.total_cantidad)

        try {
            this.setState({ loading: true})
            await create_comprobante_bien(values)
            alert('Comprobante creado')
        } catch (error) {
            alert('Error en el servidor')
        }
        this.form && this.form.reset();
    }

    render() {
        const errorMessage = 'Campo requerido'
        const date = new Date();
        return (
            <React.Fragment>
                <Container fluid>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col sm="12">
                                <h3 className="page-title">INGRESO DE BIEN - COMPROBANTE DE ENTRADA</h3>
                        
                            </Col>
                            <Breadcrumb>
                                    <BreadcrumbItem active>Comprobante de entrada</BreadcrumbItem>
                            </Breadcrumb>
                        </Row>                        
                    </div>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody className="form-comprobante">
                                <AvForm className="form-horizontal" onValidSubmit={this.handleSubmit} ref={c => (this.form = c)}>
                                    <Row>
                                        <Col sm='4'>
                                        <p>Entrada: {
                                                    date.getDate() + "-"+ date.getMonth()+ "-" +date.getFullYear()
                                                }</p>
                                        </Col>
                                    </Row>
                                    <Row>   
                                        <Col sm='6'>
                                            <AvField label="Clase entrada" placeholder="Ingrese la clase de entrada" name="clase_entrada" type="text" grid={{ xs: 8}} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                        <Col sm='6'>
                                            <AvField label="N&uacute;mero" placeholder="Ingrese el n&uacute;mero" name="numero" type="text" grid={{ xs: 8}} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                    </Row> 
                                    <Row>
                                        <Col sm='6'>  
                                            <AvField label="Tipo contrato" placeholder="Ingrese el tipo de contrato" name="tipo_contrato" type="text" grid={{ xs: 8 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                        <Col sm='6'>
                                            <AvField label="Factura" placeholder="Ingrese la factura" name="factura" type="text" grid={{ xs: 8 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                    </Row> 
                                    <Row>
                                        <Col sm='6'>
                                            <AvField label="Proveedor" placeholder="Ingrese el proveedor" name="proveedor" type="text" grid={{ xs: 8 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                        <Col sm='6'>
                                            <AvField label="Observaciones" placeholder="Ingrese las observaciones" name="observaciones" type="text" grid={{ xs: 8 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                    <br></br>
                                    <Row>
                               
                                        <Col sm='6'>
                                            <AvField label="Grupo" placeholder="Ingrese el grupo" name="grupo" type="text" grid={{ xs: 8 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                        
                                        <Col sm='6'>
                                            <AvField label="Descripci&oacute;n" placeholder="Ingrese la descripci&oacute;n" name="descripcion_comprobante" type="text" grid={{ xs: 8 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                    </Row>
                                    <Row> 
                                        <Col sm='4'>
                                            <AvField label="Unidad" placeholder="Ingrese la unidad" name="unidad" type="text" grid={{ xs: 6 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                        <Col sm='4'>
                                            <AvField label="Cantidad" placeholder="Ingrese la cantidad" name="cantidad" type="text" grid={{ xs: 6 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                     
                                        <Col sm='4'>
                                            <AvField label="Valor Unitario" placeholder="Ingrese el valor unitario" name="valor_unitario" type="text" grid={{ xs: 6 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm='4'>
                                            <AvField label="Subtotal" placeholder="Ingrese el subtotal" name="subtotal" type="text" grid={{ xs: 6 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                        <Col sm='4'>
                                            <AvField label="% IVA" placeholder="Ingrese la %IVA" name="porcentaje_iva" type="text" grid={{ xs: 6 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                pattern: { value: '^[0-9,.]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                        <Col sm='4'>
                                            <AvField label="Total IVA" placeholder="Ingrese el total IVA" name="total_iva" type="text" grid={{ xs: 6 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                pattern: { value: '^[0-9,.]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col> 
                                    
                                    </Row>
                                    <br></br>  
                                    <Row>
                                        <Col sm='6'>
                                            <AvField label="Total Cantidad" placeholder="Ingrese el total de la cantidad" name="total_cantidad" type="text" grid={{ xs: 8 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col> 
                                        <Col sm='6'>
                                            <AvField label="Subtotal Grupo" placeholder="Ingrese el subtotal del grupo" name="subtotal_grupo" type="text" grid={{ xs: 8 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>   
                                    </Row>
                                    <Row>
                                        <Col sm='6'>
                                            <AvField label="Total Cantidad ENTRADA" placeholder="" value={1} name="total_cantidad_entrada" type="text" grid={{ xs: 8 }} disabled={true} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                        <Col sm='6'>
                                            <AvField label="Total ENTRADA" placeholder="" value={1} name="total_entrada" type="text" grid={{ xs: 8 }} disabled={true} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                    </Row>

                                        <Row className="form-group m-t-20">
                                            <Col md="12" className="text-right">
                                                {this.state.loading ? <Button color="primary" className="w-md waves-effect waves-light">Cargando ...</Button> :
                                                    <Button color="primary" className="w-md waves-effect waves-light" type="submit">Generar comprobante</Button>}
                                            </Col>
                                        </Row>
                                    </AvForm>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>                    
                </Container>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(null, { activateAuthLayout })(ComprobanteEntrada));

