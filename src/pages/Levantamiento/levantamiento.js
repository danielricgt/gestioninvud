import React, { Component } from 'react';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem, Input, Form, FormGroup, Button, Spinner } from 'reactstrap';
import { activateAuthLayout } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLoggedInUser } from './../../helpers/authUtils'
import LevantamientoTable from './../Tables/levantamiento';
import { get_bienes } from './../../helpers/fetch';
// import { GET_BIENES } from './../../graphql/queries'

class Levantamiento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Bienes: null,
            Depedendencias: null,
            loading: true,
            user: getLoggedInUser(),
        };
    }

    async componentDidMount() {
        const idSede = Number(this.state.user.dependencia.sede.id)
        const { loading, error, data } = await get_bienes({idSede})
        if(loading) {
            console.log('cargando');
        }
        if(error) {
            alert('Error')
        }
        this.setState({ Bienes: data.bien, loading: false, Depedendencias: data.dependencia })
    }

    handlerInput(){

    }

    render() {
        const { Bienes, loading, user, Depedendencias } = this.state;
        const idRol = Number(user.auth.rol.id)
        const idDependencia = Number(user.dependencia.id)
        return (
            <React.Fragment>
                <Container fluid>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col sm="12">
                                <h3 className="page-title">LEVANTAMIENTO</h3>
                                <Breadcrumb>
                                    <BreadcrumbItem active>Levantamiento</BreadcrumbItem>
                                </Breadcrumb>
                            </Col>
                        </Row>
                    </div>


                    <Row>
                        <Col sm="4">
                            <h5 className="page-title">Busqueda por dependencia</h5>
                            <Form inline>
                                <FormGroup style={{ marginBottom: '15px' }}>
                                    <Input type="select" name="idDependencia" id="idDependencia"
                                        value={loading ? "" : idDependencia} onChange={this.handlerInput}>
                                        <option disabled value="">Seleccione una Dependencias</option>
                                        {loading ?
                                            <option></option>
                                            :
                                            Depedendencias.map(({ id, dependencia }) =>
                                                <option value={id} key={id}>{dependencia}</option>
                                            )}
                                    </Input>
                                    <Button className="btn btn-primary" style={{ marginLeft: '8px' }}>Filtrar</Button>
                                </FormGroup>
                            </Form>
                        </Col>
                        {/* <Col sm="4" className='col-md-3 col-md-offset-1'>
                            <h4 className="page-title">Busqueda por placa</h4>
                            <Input type="text" name="placa" id="placa" placeholder="&#x1F50D; Placa" />
                        </Col> */}
                    </Row>
                    <Row>
                        {loading ?
                            <Spinner color="info" style={{ width: '3rem', height: '3rem', marginLeft: '45%', margingRight: '45%' }} type="grow" /> :
                            <LevantamientoTable idRol={idRol} Bienes={Bienes} ></LevantamientoTable>
                        }
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(null, { activateAuthLayout })(Levantamiento));