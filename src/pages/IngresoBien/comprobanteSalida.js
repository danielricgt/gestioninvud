import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Breadcrumb, BreadcrumbItem, Button, FormGroup } from 'reactstrap';
import { activateAuthLayout } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { getBienIdByFactura, getUsuarioById, getBienComprobanteByIdBien, editarBienSalida } from './../../helpers/fetch'

class ComprobanteSalida extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            bien: null,
            show: false,
            showCedula: false,

            id: '',
            idComprobante: '',
            funcionario: '',
            dependencia: '',
            idDependencia: '',
            sede: '',
            idSede: '',

            cantidad: '',
            clase_entrada: '',
            descripcion_comprobante: '',
            factura: '',
            grupo: '',
            numero: '',
            observaciones: '',
            porcentaje_iva: '',
            proveedor: '',
            subtotal: '',
            subtotal_grupo: '',
            tipo_contrato: '',
            total: '',
            total_cantidad: '',
            total_cantidad_entrada: '',
            total_entrada: '',
            total_iva: '',
            unidad: '',
            valor_unitario: '',

        };

        this.submitFactura = this.submitFactura.bind(this)
        this.submitCedula = this.submitCedula.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async submitFactura(event, values) {
        const result = await getBienIdByFactura(values)
        if(result.data.bien.length === 0) 
            alert('No existen facturas')
        else {
            const bien = result.data.bien[0]
            const resultComprobante = await getBienComprobanteByIdBien({id: bien.id})
            const comprobante = resultComprobante.data.bien[0].comprobante
            this.setState({ 
                bien: bien, 
                showCedula: true,
                idComprobante: comprobante.id,
                cantidad: comprobante.cantidad,
                clase_entrada: comprobante.clase_entrada,
                descripcion_comprobante: '',
                factura: values.factura,
                grupo: comprobante.grupo,
                numero: comprobante.numero,
                observaciones: comprobante.observaciones,
                porcentaje_iva: comprobante.porcentaje_iva,
                proveedor: comprobante.proveedor,
                subtotal: comprobante.subtotal,
                subtotal_grupo: comprobante.subtotal_grupo,
                tipo_contrato: comprobante.tipo_contrato,
                total: comprobante.total,
                total_cantidad: comprobante.total_cantidad,
                total_cantidad_entrada: comprobante.total_cantidad_entrada,
                total_entrada: comprobante.total_entrada,
                total_iva: comprobante.total_iva,
                unidad: comprobante.unidad,
                valor_unitario: comprobante.valor_unitario,
            })
        }
    }

    async submitCedula(event, values) {
        const result = await getUsuarioById(values)
        if(result.data.usuario.length === 0) 
            alert('No existe usuario')

        const usuario = result.data.usuario[0]
        this.setState({
            funcionario: `${usuario.nombres} ${usuario.apellidos}`,
            dependencia: usuario.dependencia.dependencia,
            idDependencia: usuario.dependencia.id,
            sede: usuario.dependencia.sede.sede,
            idSede: usuario.dependencia.sede.id,
            id: values.id,
            show: true,
        })
    }

    async  handleSubmit(event, values) {
        const date = new Date();
        const data = {
            idBien: this.state.bien.id,
            fk_usuario: Number(this.state.id),
            descripcion: values.descripcion,
            tipo_bien: values.tipo_bien,
            placa: values.placa,
            marca_serie: values.marca_serie,
            espacio_fisico: values.ubicacion,
            idComprobante: this.state.idComprobante,
            salida: values.salida,
            fecha_creacion: date.toISOString(),

        }
        try {
            this.setState({ loading: true})
            await editarBienSalida(data)
            this.setState({ id:'', factura:'', show: false, showCedula: false, loading: false})
            alert('Bien ingresado')
            this.form && this.form.reset();
        } catch (error) {
            console.log(error);
            alert('Error en el servidor')
        }
    }

    render() {
        const { show, showCedula} = this.state
        const errorMessage = 'Campo requerido'
        const date = new Date();
        return (
            <React.Fragment>
                <Container fluid>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col sm="12">
                                <h4 className="page-title">INGRESO DE BIEN - COMPROBANTE DE SALIDA</h4>
                            </Col>
                            <Breadcrumb>
                                <BreadcrumbItem active>Comprobante de salida</BreadcrumbItem>
                            </Breadcrumb>
                        </Row>
                    </div>

                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <Row>
                                        <AvForm className="form-horizontal" inline onValidSubmit={this.submitFactura}>
                                            <FormGroup>
                                                <AvField name="factura" value={this.state.factura} disabled={showCedula} type="text" placeholder="Ingrese la factura" label="Factura"/>   
                                                <Button color="primary" className="w-md waves-effect waves-light" type="submit">Buscar</Button>
                                            </FormGroup>
                                        </AvForm>
                                    </Row>
                                    <br/>
                                    <Row>
                                        { !showCedula ? '' : 
                                        <AvForm className="form-horizontal" inline onValidSubmit={this.submitCedula}>
                                            <FormGroup>
                                                <AvField name="id" label="N° Identificaci&oacute;n" type="text"  validate={{
                                                    required: { value: true, errorMessage: errorMessage },
                                                    pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                }} />   
                                                <Button color="primary" className="w-md waves-effect waves-light" type="submit">Buscar</Button>
                                            </FormGroup>
                                        </AvForm>
                                        }
                                    </Row>
                                    <hr/>
                                    <br/>
                                    { !show ? '' :                                    
                                    <AvForm className="form-horizontal" onValidSubmit={this.handleSubmit} ref={c => (this.form = c)}>
                                        <Row>
                                            <Col sm='4'>
                                                <p>Entrada: {
                                                    date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()
                                                }</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm='6'>
                                                <AvField label="Salida" placeholder="Ingrese la salida" name="salida" type="text" grid={{ xs: 8 }} validate={{
                                                    required: { value: true, errorMessage: errorMessage },
                                                    // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                }} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm='6'>
                                                <AvField label="Entrada" placeholder="Ingrese la entrada" name="entrada" type="text" grid={{ xs: 8 }} validate={{
                                                    required: { value: true, errorMessage: errorMessage },
                                                    // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                }} />
                                            </Col>
                                        </Row>
                                        {/*s <Row>
                                        <Col sm='6'>
                                            <AvField label="Factura" placeholder="" name="factura" type="text" grid={{ xs: 8 }} validate={{
                                                required: { value: true, errorMessage: errorMessage },
                                                // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                            }} />
                                        </Col>
                                    </Row> */}
                                        <hr></hr>
                                        <br></br>
                                        <Row>
                                            <Col sm='4'>
                                                <AvField label="Sede" value={this.state.sede} disabled={true} placeholder="Ingrese la sede" name="sede" type="text" grid={{ xs: 8 }} validate={{
                                                    required: { value: true, errorMessage: errorMessage },
                                                    // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                }} />
                                            </Col>
                                            
                                            <Col sm='4'>
                                                <AvField label="Dependencia" value={this.state.dependencia} disabled={true} placeholder="Ingrese la dependencia" name="dependencia" type="text" grid={{ xs: 8 }} validate={{
                                                    required: { value: true, errorMessage: errorMessage },
                                                    // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                }}/>
                                            </Col>
                                            <Col sm='4'>
                                                <AvField label="Ubicaci&oacute;n" placeholder="Ingrese la ubicaci&oacute;n" name="ubicacion" type="text" grid={{ xs: 8 }} validate={{
                                                    required: { value: true, errorMessage: errorMessage },
                                                    // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                }} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm='4'>
                                                <AvField label="Funcionario" value={this.state.funcionario} disabled={true} placeholder="Ingrese el funcionario" name="funcionario" type="text" grid={{ xs: 8 }} validate={{
                                                    required: { value: true, errorMessage: errorMessage },
                                                    // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                }} />
                                            </Col>
                                            <Col sm='4'>
                                                <AvField label="C&eacute;dula" value={this.state.id} disabled={true} placeholder="Ingrese la cedula" name="cedula" type="text" grid={{ xs: 8 }} validate={{
                                                    required: { value: true, errorMessage: errorMessage },
                                                    // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                }} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm='4'>
                                                <AvField label="Proveedor" value={this.state.proveedor} disabled={true} placeholder="Ingrese el proveedor" name="proveedor" type="text" grid={{ xs: 8 }} validate={{
                                                    required: { value: true, errorMessage: errorMessage },
                                                    // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                }} />
                                            </Col>
                                            <Col sm='4'>
                                                <AvField label="Observaciones" value={this.state.observaciones} disabled={true} placeholder="Ingrese las observaciones" name="observaciones" type="text" grid={{ xs: 8 }} validate={{
                                                    required: { value: true, errorMessage: errorMessage },
                                                    // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                }} />
                                            </Col>
                                        </Row>
                                        <br></br>

                                        <Row>
                                            <Col sm='4'>
                                                <AvField label="Grupo" value={this.state.grupo} disabled={true} placeholder="Ingrese el grupo" name="grupo" type="text" grid={{ xs: 6 }} validate={{
                                                    required: { value: true, errorMessage: errorMessage },
                                                    // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                }} />
                                            </Col>
                                            <Col sm='4'>
                                                <AvField label="Unidad" value={Number(this.state.unidad) === 0 ? '0' : this.state.unidad} disabled={true} placeholder="Ingrese la unidad" name="unidad" type="text" grid={{ xs: 6 }} validate={{
                                                    required: { value: true, errorMessage: errorMessage },
                                                    // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                }} />
                                            </Col>

                                            <Col sm='4'>
                                                <AvField label="Cantidad" value={Number(this.state.cantidad) === 0 ? '0': this.state.cantidad} disabled={true} placeholder="Ingrese la cantidad" name="cantidad" type="text" grid={{ xs: 6 }} validate={{
                                                    required: { value: true, errorMessage: errorMessage },
                                                    pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                }} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm='4'>
                                                <AvField label="Tipo bien" placeholder="Ingrese el tipo de bien" name="tipo_bien" type="text" grid={{ xs: 6 }} validate={{
                                                    required: { value: true, errorMessage: errorMessage },
                                                    // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                }} />
                                            </Col>
                                            <Col sm='4'>
                                                <AvField label="Placa" placeholder="Ingrese la placa" name="placa" type="text" grid={{ xs: 6 }} validate={{
                                                    required: { value: true, errorMessage: errorMessage },
                                                    // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                }} />
                                            </Col>

                                            <Col sm='4'>
                                                <AvField label="Descripci&oacute;n" placeholder="Ingrese la descripci&oacute;n" name="descripcion" type="text" grid={{ xs: 6 }} validate={{
                                                    required: { value: true, errorMessage: errorMessage },
                                                    // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                }} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm='4'>
                                                <AvField label="Marca/serie" placeholder="Ingrese la Marca/Serie" name="marca_serie" type="text" grid={{ xs: 6 }} validate={{
                                                    required: { value: true, errorMessage: errorMessage },
                                                    // pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                }} />
                                            </Col>
                                            <Col sm='4'>
                                                <AvField label="Valor unitario" value={Number(this.state.valor_unitario) === 0 ? '0' : this.state.valor_unitario} disabled={true} placeholder="Ingrese el valor unitario" name="valor_unitario" type="text" grid={{ xs: 6 }} validate={{
                                                    required: { value: true, errorMessage: errorMessage },
                                                    pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                }} />
                                            </Col>

                                            <Col sm='4'>
                                                <AvField label="% IVA" value={Number(this.state.porcentaje_iva) === 0 ? '0' : this.state.porcentaje_iva } disabled={true} placeholder="Ingrese el %IVA" name="porcentaje_iva" type="text" grid={{ xs: 6 }} validate={{
                                                    required: { value: true, errorMessage: errorMessage },
                                                    pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                }} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm='4'>
                                                <AvField label="Subtotal" value={Number(this.state.subtotal) === 0 ? '0' :this.state.subtotal} disabled={true} placeholder="Ingrese el subtotal" name="subtotal" type="text" grid={{ xs: 6 }} validate={{
                                                    required: { value: true, errorMessage: errorMessage },
                                                    pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                }} />
                                            </Col>
                                            <Col sm='4'>
                                                <AvField label="TOTAL IVA" value={Number(this.state.total_iva) ===0 ? '0' : this.state.total_iva } disabled={true} placeholder="Ingrese el total IVA" name="total_iva" type="text" grid={{ xs: 6 }} validate={{
                                                    required: { value: true, errorMessage: errorMessage },
                                                    pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                }} />
                                            </Col>
                                            <Col sm='4'>
                                                <AvField label="Total" value={Number(this.state.total) === 0 ? '0' : this.state.total} disabled={true} placeholder="Ingrese el total" name="total" type="text" grid={{ xs: 6 }} validate={{
                                                    required: { value: true, errorMessage: errorMessage },
                                                    pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                }} />
                                            </Col>

                                        </Row>
                                        <br></br>
                                        <Row>
                                            <Col sm='6'>
                                                <AvField label="Total Cantidad" value={this.state.total_cantidad} disabled={true} placeholder="Ingrese la total cantidad" name="total_cantidad" type="text" grid={{ xs: 8 }} validate={{
                                                    required: { value: true, errorMessage: errorMessage },
                                                    pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                }} />
                                            </Col>
                                            <Col sm='6'>
                                                <AvField label="Subtotal Grupo" value={this.state.subtotal_grupo} disabled={true} placeholder="Ingrese el subtotal de grupo" name="subtotal_grupo" type="text" grid={{ xs: 8 }} validate={{
                                                    required: { value: true, errorMessage: errorMessage },
                                                    pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                }} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm='6'>
                                                <AvField label="Total Cantidad ENTRADA" value={this.state.total_cantidad_entrada} placeholder="Ingrese el total de cantidad entrada" disabled={true} name="total_cantidad_entrada" type="text" grid={{ xs: 8 }} validate={{
                                                    required: { value: true, errorMessage: errorMessage },
                                                    pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                }} />
                                            </Col>
                                            <Col sm='6'>
                                                <AvField label="Total ENTRADA"  value={this.state.total_entrada} disabled={true} placeholder="Ingrese el total entrada" name="total_entrada" type="text" grid={{ xs: 8 }} validate={{
                                                    required: { value: true, errorMessage: errorMessage },
                                                    pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                                }} />
                                            </Col>
                                        </Row>

                                        <Row className="form-group m-t-20">
                                            <Col md="12" className="text-right">
                                                {this.props.loading ? <Button color="primary" className="w-md waves-effect waves-light">Cargando ...</Button> :
                                                    <Button color="primary" className="w-md waves-effect waves-light" type="submit">Generar comprobante</Button>}
                                            </Col>
                                        </Row>
                                    </AvForm>
                                    }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>

            </React.Fragment>
        );
    }
}

export default withRouter(connect(null, { activateAuthLayout })(ComprobanteSalida));