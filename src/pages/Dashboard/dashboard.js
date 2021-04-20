import React, { Component } from 'react';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem, Input, Form, FormGroup, Button, Spinner } from 'reactstrap';
import { activateAuthLayout } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLoggedInUser } from './../../helpers/authUtils'
import BienesTable from './../Tables/Bienes';
import client from './../../graphql/client'
import { GET_BIENES } from './../../graphql/queries'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Bienes: null,
            Depedendencias: null,
            loading: true,
            user: getLoggedInUser(),
            updated: false,

        };

        this.fetchData = this.fetchData.bind(this)
    }

    componentDidMount() {
        const idSede = Number(this.state.user.dependencia.sede.id)
        this.fetchData(idSede)
        this.setState({ modalSwal: true})
    }

    fetchData(idSede){
        client.query({
            query: GET_BIENES,
            variables: { idSede },
            fetchPolicy: 'no-cache'
        })
        .then(result => {
            this.setState({ Bienes: result.data.bien, loading: false, Depedendencias: result.data.dependencia })
        })
    }

    handlerInput() {

    }


    render() {
        const { Bienes, loading, user, Depedendencias } = this.state;
        const idSede = Number(this.state.user.dependencia.sede.id)
        const idRol = Number(user.auth.rol.id)
        const idDependencia = Number(user.dependencia.id)
        
        return (
            <React.Fragment>
                
                <Container fluid>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col sm="12">
                                <Breadcrumb>
                                    <BreadcrumbItem active>Bienvenido al UD Dashboard {user.nombres}</BreadcrumbItem>
                                </Breadcrumb>
                                <h4 className="page-title">CONSULTA DE INVENTARIOS</h4>

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
                        <Col sm="4" className='col-md-3 col-md-offset-4'>
                            <h5 className="page-title">Busqueda por placa</h5>
                            <Input type="text" name="placa" id="placa" placeholder="&#x1F50D; Placa" />
                        </Col>
                    </Row>
                    <Row>

                        {loading ?
                            <Spinner color="info" style={{ width: '3rem', height: '3rem', marginLeft: '45%', margingRight: '45%' }} type="grow" /> :
                            <BienesTable idRol={idRol} Bienes={Bienes} update={async() => await this.fetchData(idSede)}></BienesTable>
                        }
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(null, { activateAuthLayout })(Dashboard));