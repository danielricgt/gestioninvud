import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { activateAuthLayout } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { create_comprobante_bien } from './../../helpers/fetch'


class TrasladoIndividual extends Component {
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
            
            alert('Elemento creado')
        } catch (error) {
            alert('Error en el servidor')
        }
        this.form && this.form.reset();
    }

    render() {
        const errorMessage = 'Campo requerido'
        return (
            <React.Fragment>
                <Container fluid>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col sm="12">
                                <h4 className="page-title">TRASLADO DE BIEN INDIVIDUAL</h4>
                        
                            </Col>
                            <Breadcrumb>
                                    <BreadcrumbItem active>Traslado de bien individual</BreadcrumbItem>
                            </Breadcrumb>
                        </Row>                        
                    </div>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                <AvForm className="form-horizontal" onValidSubmit={this.handleSubmit} ref={c => (this.form = c)}>
                                    <Row>
                                        <Col sm='6'>  
                                            <AvField label="Tipo de Traslado" placeholder="Traslado de bienes individuales" name="tipo_traslado" type="text" grid={{ xs: 8 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                        <Col sm='6'>
                                            <AvField label="Espacio F&iacute;sico" placeholder="Todos" name="espacio_fisico" type="text" grid={{ xs: 8 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                    </Row>
                                    <hr></hr> 
                                    <Row>
                                        <Col sm='4' className="subtitulo-form">
                                        <p>Quien Autoriza </p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm='3'>  
                        
                                        <p>Identificaci&oacute;n</p><br></br><p>000000000</p>
                        
                                        </Col>
                                        <Col sm='3'>
                                        <p>Funcionario</p><br></br><p>Pepito Perez</p>
                                        </Col>
                                        <Col sm='3'>  
                                        <p>Correo</p><br></br><p>asf@ads.co</p>    
                                        </Col>
                                        <Col sm='3'>
                                        <p>Cargo</p><br></br><p>ingeniero</p>     
                                        </Col>
                                    </Row>
                                    <hr></hr> 
                                    <Row>
                                        <Col sm='6' className="subtitulo-form">
                                        <p>Quien Entrega </p>
                                        </Col>
                                        <Col sm='6' className="subtitulo-form">
                                        <p>Quien Recibe </p>
                                        </Col>
                                    </Row>
                                    <Row>
                                    <Col sm='6'>  
                                            <AvField label="Identificaci&oacute;n" placeholder="1234123456" name="id_entrega" type="text" grid={{ xs: 8 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                        <Col sm='6'>
                                            <AvField label="Identificaci&oacute;n" placeholder="1234123456" name="id_recibe" type="text" grid={{ xs: 8 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm='6'>
                                            <Row>  
                                                <Col sm='3'>  
                                
                                                <p>Identificaci&oacute;n</p><br></br><p>000000000</p>
                                
                                                </Col>
                                                <Col sm='3'>
                                                <p>Funcionario</p><br></br><p>Pepito Perez</p>
                                                </Col>
                                                <Col sm='3'>  
                                                <p>Correo</p><br></br><p>asf@ads.co</p>    
                                                </Col>
                                                <Col sm='3'>
                                                <p>Cargo</p><br></br><p>ingeniero</p>     
                                                </Col>
                                            </Row>   
                                        </Col>
                                        
                                        <Col sm='6'>
                                            <Row>
                                                <Col sm='3'>  
                                                <p>Identificaci&oacute;n</p><br></br><p>000000000</p>
                                                </Col>
                                                <Col sm='3'>
                                                <p>Funcionario</p><br></br><p>Pepito Perez</p>
                                                </Col>
                                                <Col sm='3'>  
                                                <p>Correo</p><br></br><p>asf@ads.co</p>    
                                                </Col>
                                                <Col sm='3'>
                                                <p>Cargo</p><br></br><p>ingeniero</p>     
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <hr></hr> 

                                    <Row className="form-group m-t-20">
                                        <Col md="12" className="text-right">
                                           {this.state.loading ? <Button color="primary" className="w-md waves-effect waves-light">Cargando ...</Button> :
                                                <Button color="primary" className="w-md waves-effect waves-light" type="submit">Trasladar Bienes</Button>}
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

export default withRouter(connect(null, { activateAuthLayout })(TrasladoIndividual));

