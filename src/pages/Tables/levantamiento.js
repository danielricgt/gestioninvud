import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, } from 'reactstrap';
import { MDBDataTableV5 } from 'mdbreact';
import { levantamientoColumns } from './columnsData'
import { update_bien } from './../../helpers/fetch'
import SweetAlert from 'react-bootstrap-sweetalert';
import ModalUpdateBien from './../Modals/modalUpdateBien'

class LevantamientoTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            BienesData: props.Bienes,
            Bienes: [],

            confirm: false,
            modal: false,
            loading: false,

            descripcion: '',
            espacio_fisico: '',
            observaciones: '',
            idBien: '',
            idEstado: '',
        }
        this.changeStateBien = this.changeStateBien.bind(this)
        this.updateBien = this.updateBien.bind(this)
        this.openModal = this.openModal.bind(this)
        // this.updateTable = this.updateTable.bind(this)
    }

    componentDidMount() {
        const { Bienes } = this.props
        this.setState({
            Bienes
        })
    }

    changeStateBien = async (data, idRol, bien) => {
        if (idRol === 1) data.fk_estado = 7
        data.descripcion = bien.descripcion
        data.espacio_fisico = bien.espacio_fisico
        data.observaciones = bien.observaciones

        try {
            await update_bien(data)
            this.updateTable(data)
            alert('Actualización exitosa')
        } catch {
            alert('Error en el servidor')
        }
    }

    async updateBien(dataForm) {
        
        try {
            await update_bien(dataForm)
            await this.updateTable(dataForm)
            alert('Actualización exitosa')
        } catch {
            alert('Error en el servidor')
        }
    }


    openModal(data) {
        this.setState(prevState => ({
            modal: !prevState.modal,
            data
            // modal: true
        }));
    }

    render() {
        // const { idRol, Bienes  } = this.props;
        // const { BienesData } = this.state;
        let columns = levantamientoColumns
        let rows = [
            {
                name: 'Tiger Nixon',
                position: 'System Architect',
                office: 'Edinburgh',
                age: '61',
                date: '2011/04/25',
                salary: '$320',
              },
              {
                name: 'Garrett Winters',
                position: 'Accountant',
                office: 'Tokyo',
                age: '63',
                date: '2011/07/25',
                salary: '$170',
              },
              {
                name: 'Ashton Cox',
                position: 'Junior Technical Author',
                office: 'San Francisco',
                age: '66',
                date: '2009/01/12',
                salary: '$86',
              },
              {
                name: 'Cedric Kelly',
                position: 'Senior Javascript Developer',
                office: 'Edinburgh',
                age: '22',
                date: '2012/03/29',
                salary: '$433',
              },
              {
                name: 'Airi Satou',
                position: 'Accountant',
                office: 'Tokyo',
                age: '33',
                date: '2008/11/28',
                salary: '$162',
              },
              {
                name: 'Brielle Williamson',
                position: 'Integration Specialist',
                office: 'New York',
                age: '61',
                date: '2012/12/02',
                salary: '$372',
              },
              {
                name: 'Herrod Chandler',
                position: 'Sales Assistant',
                office: 'San Francisco',
                age: '59',
                date: '2012/08/06',
                salary: '$137',
              },
              {
                name: 'Rhona Davidson',
                position: 'Integration Specialist',
                office: 'Tokyo',
                age: '55',
                date: '2010/10/14',
                salary: '$327',
              },
              {
                name: 'Colleen Hurst',
                position: 'Javascript Developer',
                office: 'San Francisco',
                age: '39',
                date: '2009/09/15',
                salary: '$205',
              },
              {
                name: 'Sonya Frost',
                position: 'Software Engineer',
                office: 'Edinburgh',
                age: '23',
                date: '2008/12/13',
                salary: '$103',
              }
        ]

        // if (idRol === 4) {
        //     columns = columns.slice(0, columns.length - 2)
        // }   

        // Bienes.forEach(data => {
        //     if(data.usuario) {
        //         rows.push({
        //             placa: data.placa ? data.placa : '-',
        //             descripcion: data.descripcion ? data.descripcion : '-',
        //             sede: data.usuario.dependencia.sede.sede ? data.usuario.dependencia.sede.sede : '-',
        //             espacio_fisico: data.espacio_fisico ? data.espacio_fisico : '-',
        //             dependencia: data.usuario.dependencia.dependencia ? data.usuario.dependencia.dependencia : '-',
        //             observaciones: data.observaciones ? data.observaciones : 'Ninguna',
        //             dar_baja: idRol === 4 ? '' :
        //                 Number(data.estado.id) === 1 ?
        //                     <button className="btn btn-danger rounded-pill" onClick={() => this.changeStateBien({ id: Number(data.id), fk_estado: 2 }, idRol, data)}>Dar de baja</button>
        //                 : Number(data.estado.id) === 2 ? <button className="btn btn-success rounded-pill" onClick={() => this.changeStateBien({ id: Number(data.id), fk_estado: 1 }, idRol, data)}>Dar de alta</button>
        //                         : <button className="btn btn-secondary rounded-pill" disabled={true}>Pendiente</button>,
        //             actualizar: idRol === 4 ? '' : <button className="btn btn-primary rounded-pill" onClick={() => this.openModal(data)}>Actualizar</button>
        //         })
        //     }
        // })

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
                                    {this.state.confirm ?
                                        <SweetAlert success title="" onConfirm={this.closeAlert()} >
                                            Actualización correcta
                                    </SweetAlert> : <p></p>}
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
                            { this.state.modal ?
                                <ModalUpdateBien callback={this.updateBien} data={this.state.data}/> : <p></p>
                            }
                        </Col>
                    </Row>

                    

                   
                </Container>
            </React.Fragment>
        );
    }
}

export default LevantamientoTable;