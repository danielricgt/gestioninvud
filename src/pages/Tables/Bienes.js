import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { MDBDataTableV5 } from 'mdbreact';
import { bienColumns } from './columnsData'
import { update_bien } from './../../helpers/fetch'
import ModalUpdateBien from './../Modals/modalUpdateBien'

class BienesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            BienesData: props.Bienes,
            Bienes: [],
            modalConfirm: false,
            confirm: false,
            modal: false,
            loading: false,

            descripcion: '',
            espacio_fisico: '',
            observaciones: '',
            idBien: '',
            idEstado: '',

            data: null,
            idRolTable: '',
            bien: null,
        }
        this.changeStateBien = this.changeStateBien.bind(this)
        this.updateBien = this.updateBien.bind(this)
        this.openModal = this.openModal.bind(this)
        this.modalConfimation = this.modalConfimation.bind(this)
        this.callbackModal = this.callbackModal.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
    }

    componentDidMount() {
        const { Bienes } = this.props
        this.setState({
            Bienes
        })
    }

    changeStateBien = async () => {
        const { data, idRolTable, bien } = this.state;
        if (idRolTable === 1) data.fk_estado = 7
        data.descripcion = bien.descripcion
        data.espacio_fisico = bien.espacio_fisico
        data.observaciones = bien.observaciones

        try {
            await update_bien(data)
            alert('Actualización correcta')
            this.props.update(this.props.idRol)

        } catch (er) {
            alert('Error en el servidor')
        }
    }

    async updateBien(dataForm) {
        try {
            await update_bien(dataForm)
            this.props.update(this.props.idRol)
            alert('Bien actualizado')
        } catch {
            alert('Error en el servidor')
        }
    }


    openModal(data) {
        this.setState(prevState => ({
            modal: !prevState.modal,
            data
        }));
    }

    modalConfimation(data, idRol, bien) {
        this.setState({ data, idRolTable: idRol, bien, modalConfirm: true })
    }

    callbackModal() {
        this.setState({ modal: false });
    }

    toggleModal() {
        this.setState(prevState => ({
            modalConfirm: !prevState.modal
        }));
    }


    render() {
        const { idRol, Bienes } = this.props;
        let columns = bienColumns
        let rows = []

        if (idRol === 4) {
            columns = columns.slice(0, columns.length - 2)
        }

        Bienes.forEach(data => {
            if (data.usuario) {
                rows.push({
                    placa: data.placa ? data.placa : '-',
                    descripcion: data.descripcion ? data.descripcion : '-',
                    sede: data.usuario.dependencia.sede.sede ? data.usuario.dependencia.sede.sede : '-',
                    espacio_fisico: data.espacio_fisico ? data.espacio_fisico : '-',
                    dependencia: data.usuario.dependencia.dependencia ? data.usuario.dependencia.dependencia : '-',
                    observaciones: data.observaciones ? data.observaciones : 'Ninguna',
                    dar_baja: idRol === 4 ? '' :
                        Number(data.estado.id) === 1 ?
                            <button className="btn btn-danger rounded-pill" onClick={() => this.modalConfimation({ id: Number(data.id), fk_estado: 2 }, idRol, data)}>Dar de baja</button>
                            : Number(data.estado.id) === 2 ? <button className="btn btn-success rounded-pill" onClick={() => this.modalConfimation({ id: Number(data.id), fk_estado: 1 }, idRol, data)}>Dar de alta</button>
                                : <button className="btn btn-secondary rounded-pill" disabled={true}>Pendiente</button>,
                    actualizar: idRol === 4 ? '' : <button className="btn btn-primary rounded-pill" onClick={() => this.openModal(data)}>Actualizar</button>
                })
            }
        })

        const data = {
            columns,
            rows,
        }

        return (
            <React.Fragment>
                <Container fluid>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <MDBDataTableV5
                                        responsive
                                        bordered
                                        searching={false}
                                        fullPagination={true}
                                        infoLabel={['', '-', 'de', '']}
                                        data={data}
                                    />
                                </CardBody>
                            </Card>
                            {this.state.modal ?
                                <ModalUpdateBien callback={this.updateBien} modal={this.state.modal} callbackModal={this.callbackModal} data={this.state.data} /> : <p></p>
                            }
                        </Col>
                    </Row>                    

                    <Modal isOpen={this.state.modalConfirm} toggle={this.toggleModal} >
                        <div className="modal-header">
                            <h5 className="modal-title mt-0" id="myModalLabel">Modal Heading</h5>
                            <button type="button" onClick={() => this.setState({ modalConfirm: false })} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <ModalBody>
                            <h5>Overflowing text to show scroll behavior</h5>
                            <p>Cras mattis consectetur purus sit amet fermentum.
                            Cras justo odio, dapibus ac facilisis in,
                            egestas eget quam. Morbi leo risus, porta ac
                                                            consectetur ac, vestibulum at eros.</p>
                            <p>Praesent commodo cursus magna, vel scelerisque
                            nisl consectetur et. Vivamus sagittis lacus vel
                                                            augue laoreet rutrum faucibus dolor auctor.</p>
                            <p>Aenean lacinia bibendum nulla sed consectetur.
                            Praesent commodo cursus magna, vel scelerisque
                            nisl consectetur et. Donec sed odio dui. Donec
                            ullamcorper nulla non metus auctor
                                                            fringilla.</p>
                            <p>Cras mattis consectetur purus sit amet fermentum.
                            Cras justo odio, dapibus ac facilisis in,
                            egestas eget quam. Morbi leo risus, porta ac
                                                            consectetur ac, vestibulum at eros.</p>
                            <p>Praesent commodo cursus magna, vel scelerisque
                            nisl consectetur et. Vivamus sagittis lacus vel
                                                            augue laoreet rutrum faucibus dolor auctor.</p>
                            <p>Aenean lacinia bibendum nulla sed consectetur.
                            Praesent commodo cursus magna, vel scelerisque
                            nisl consectetur et. Donec sed odio dui. Donec
                            ullamcorper nulla non metus auctor
                                                            fringilla.</p>
                            <p>Cras mattis consectetur purus sit amet fermentum.
                            Cras justo odio, dapibus ac facilisis in,
                            egestas eget quam. Morbi leo risus, porta ac
                                                            consectetur ac, vestibulum at eros.</p>
                            <p>Praesent commodo cursus magna, vel scelerisque
                            nisl consectetur et. Vivamus sagittis lacus vel
                                                            augue laoreet rutrum faucibus dolor auctor.</p>
                            <p>Aenean lacinia bibendum nulla sed consectetur.
                            Praesent commodo cursus magna, vel scelerisque
                            nisl consectetur et. Donec sed odio dui. Donec
                            ullamcorper nulla non metus auctor
                                                            fringilla.</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" color="secondary" onClick={ () => this.setState({ modalConfirm: false})} className="waves-effect">Close</Button>
                            <Button type="button" color="primary" className="waves-effect waves-light">Save changes</Button>
                        </ModalFooter>
                    </Modal>
                </Container>
            </React.Fragment>
        );
    }
}

export default BienesTable;