import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Button, Modal, ModalFooter } from 'reactstrap';
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
            hash_bien: null,
            modalHash: false
        }
        this.changeStateBien = this.changeStateBien.bind(this)
        this.updateBien = this.updateBien.bind(this)
        this.openModal = this.openModal.bind(this)
        this.modalConfimation = this.modalConfimation.bind(this)
        this.callbackModal = this.callbackModal.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.toggleModalHash = this.toggleModalHash.bind(this)
        this.openModalHash = this.openModalHash.bind(this)
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
            this.setState({ modalConfirm: false })
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

    openModalHash(data) {
        this.setState({
            hash_bien: data,
            modalHash: true
        });
    }

    toggleModalHash() {
        this.setState(prevState => ({
            modalHash: !prevState.modal
        }));
    }


    render() {
        const { idRol, Bienes } = this.props;
        const { hash_bien } = this.state
        let columns = bienColumns
        let rows = []

        if (idRol === 4) {
            columns = columns.slice(0, columns.length - 2)
        }

        Bienes.forEach(data => {
            if (data.usuario) {
                if(idRol === 1 || idRol === 2) {
                    rows.push({
                        placa: data.placa ? data.placa : '-',
                        descripcion: data.descripcion ? data.descripcion : '-',
                        sede: data.usuario.dependencia.sede.sede ? data.usuario.dependencia.sede.sede : '-',
                        espacio_fisico: data.espacio_fisico ? data.espacio_fisico : '-',
                        dependencia: data.usuario.dependencia.dependencia ? data.usuario.dependencia.dependencia : '-',
                        observaciones: data.observaciones ? data.observaciones : 'Ninguna',
                        hash: !data.hash_bien ? 'Hash no disponible' :
                            <Button type="button" color="primary" className="waves-effect waves-light" 
                                onClick={() => this.openModalHash(data.hash_bien,)}>
                                Ver
                            </Button>,
                        actualizar: idRol === 4 ? '' : <button className="btn btn-primary rounded-pill" onClick={() => this.openModal(data)}>Actualizar</button>
                    })
                }
                else{
                    rows.push({
                        placa: data.placa ? data.placa : '-',
                        descripcion: data.descripcion ? data.descripcion : '-',
                        sede: data.usuario.dependencia.sede.sede ? data.usuario.dependencia.sede.sede : '-',
                        espacio_fisico: data.espacio_fisico ? data.espacio_fisico : '-',
                        dependencia: data.usuario.dependencia.dependencia ? data.usuario.dependencia.dependencia : '-',
                        observaciones: data.observaciones ? data.observaciones : 'Ninguna',
                        hash: !data.hash_bien ? 'Hash no disponible' :
                        <Button type="button" color="primary" className="waves-effect waves-light" 
                            onClick={() => this.openModalHash(data.hash_bien,)}>
                            Ver
                        </Button>,
                    })
                }
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
                                        fullPagination={true}
                                        infoLabel={['', '-', 'de', '']}
                                        data={data}
                                        searchTop
                                        searchBottom={false}
                                        noRecordsFoundLabel={'No se encontraron resultados'}
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
                            <h5 className="modal-title mt-0" id="confirmacion">¿Estas seguro de realizar esta acción?</h5>
                            <button type="button" onClick={() => this.setState({ modalConfirm: false })} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <ModalFooter>
                            <Button type="button" color="secondary" onClick={ () => this.setState({ modalConfirm: false})} className="waves-effect">Close</Button>
                            <Button type="button" color="primary" className="waves-effect waves-light" onClick={this.changeStateBien}>Confimar</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={this.state.modalHash} toggle={this.toggleModalHash} size="lg">
                        <div className="modal-header">
                            <h6 className="modal-title mt-0" id="confirmacion">{ hash_bien ? hash_bien : ''}</h6>
                            <button type="button" onClick={() => this.setState({ modalHash: false })} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <ModalFooter>
                            <Button type="button" color="secondary" onClick={ () => this.setState({ modalHash: false})} className="waves-effect">Close</Button>
                        </ModalFooter>
                    </Modal>
                </Container>
            </React.Fragment>
        );
    }
}

export default BienesTable;