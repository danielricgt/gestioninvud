import React, { Component } from 'react';
import { Alert, Button, Card, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { registerUser, emptyError } from '../../store/actions';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { GET_SEDE_DEPENDENCIES } from './../../graphql/queries'
import client from './../../graphql/client'

class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sedes: [],
            dependencias: [],
            id: '',
            apellidos: '',
            correo: '',
            nombres: '',
            username: '',
            password: '',
            sede: 1,
            cargo: '',
            dependencia: 1,

            user: null,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event, values) {
        try {
            await this.props.registerUser(values)
        } catch (error) {
            alert('Error en el servidor')
        }
    }

    componentDidMount() {
        client.query({
            query: GET_SEDE_DEPENDENCIES
        })
            .then(result => {
                this.setState({ sedes: result.data.sede })
                this.setState({ dependencias: result.data.sede.find(sede => sede.id === this.state.sede).dependencia })
            })
            .catch(() => this.setState({ sedes: [] }))
    }

    componentDidUpdate() {
        if(this.props.user) {
            setTimeout(() => { 
                this.props.history.push('/');
            }, 2000)
        }   
    }

    async ChangeSedes(event) {
        await this.setState({ sede: event.target.value });
        await this.setState({ dependencias: this.state.sedes.find(sede => sede.id === Number(this.state.sede)).dependencia })
    }

    render() {
        const errorMessage = 'El campo es requerido'
        return (
            <React.Fragment>
                <Row>
                    <Col xs="6">
                        <Button color="primary" className="px-4" onClick={() => this.props.history.push('/')}>Atras</Button>
                    </Col>
                </Row>
                <div className="wrapper-page">
                    <Card className="overflow-hidden account-card mx-3">

                        <div className="bg-primary p-4 text-white text-center position-relative">
                            <h4 className="font-20 m-b-5">Registro</h4>
                        </div>
                        <div className="account-card-content">

                            {this.props.user && <Alert color="success">
                                Registro Exitoso.</Alert> }

                            {this.props.registrationError && <Alert color="danger">
                                {this.props.registrationError}</Alert>}

                            <AvForm className="form-horizontal" onValidSubmit={this.handleSubmit} >
                                <AvField label="N° Identificación" placeholder="Ingrese su número de identificación" name="id" type="text" grid={{ xs: 8 }} validate={{
                                    required: { value: true, errorMessage: errorMessage },
                                    pattern: { value: '^[0-9]+$', errorMessage: 'Solo valores númericos' },
                                }} />
                                <AvField label="Nombre" placeholder="Ingrese su nombre" name="nombres" type="text" grid={{ xs: 8 }} validate={{
                                    required: { value: true, errorMessage: errorMessage },
                                    pattern: { value: '^[A-Za-z]+$', errorMessage: 'Solo valores alfanuméricos' },
                                }} />
                                <AvField label="Apellidos" placeholder="Ingrese sus apellidos" name="apellidos" type="text" grid={{ xs: 8 }} validate={{
                                    required: { value: true, errorMessage: errorMessage },
                                    pattern: { value: '^[A-Za-z]+$', errorMessage: 'Solo valores alfanuméricos' },
                                }} />
                                <AvField label="Correo" placeholder="Ingrese su correo" name="correo" type="text" grid={{ xs: 8 }} validate={{
                                    required: { value: true, errorMessage: errorMessage }
                                }} />
                                <AvField label="Sede" name="sede" type='select' value={this.state.sede} grid={{ xs: 8 }} validate={{
                                    required: { value: true, errorMessage: errorMessage }
                                }} onChange={this.ChangeSedes.bind(this)}>
                                    <option disabled value="">Seleccione una sede</option>
                                    {this.state.sedes.length === 0 ?
                                        <option></option>
                                        :
                                        this.state.sedes.map(({ id, sede }) =>
                                            <option value={id} key={id}>{sede}</option>
                                        )}
                                </AvField>
                                <AvField label="Dependencia" name="dependencia" type='select' value={this.state.dependencia} grid={{ xs: 8 }} validate={{
                                    required: { value: true, errorMessage: errorMessage }
                                }}>
                                    <option disabled value="">Seleccione una dependencia</option>
                                    {this.state.dependencias.length === 0 ?
                                        <option></option>
                                        :
                                        this.state.dependencias.map(({ id, dependencia }) =>
                                            <option value={id} key={id}>{dependencia}</option>
                                        )}
                                </AvField>
                                <AvField label="Cargo" placeholder="Ingrese su cargo" name="cargo" type="text" grid={{ xs: 8 }} validate={{
                                    required: { value: true, errorMessage: errorMessage },
                                    pattern: { value: '^[A-Za-z]+$', errorMessage: 'Solo valores alfanuméricos' },
                                }} />
                                <AvField label="Contraseña" placeholder="Ingrese su contraseña" name="password" type="password" grid={{ xs: 8 }} validate={{
                                    required: { value: true, errorMessage: errorMessage },
                                    minLength: { value: 6, errorMessage: 'Minimo 6 digitos' },
                                }} />
                                <AvField label="Confirme Contraseña" placeholder="Ingrese su contraseña" name="confirmationPassword" type="password" grid={{ xs: 8 }} validate={{
                                    match: {
                                        errorMessage: 'Contraseñas no coinciden',
                                        value: 'password',
                                    },
                                    required: {
                                        errorMessage: errorMessage,
                                        value: true,
                                    },
                                    minLength: { value: 6, errorMessage: 'Minimo 6 digitos' },
                                }} />

                                <Row className="form-group m-t-20">
                                    <Col md="12" className="text-right">
                                        {this.props.loading ? <Button color="primary" className="w-md waves-effect waves-light">Cargando ...</Button> :
                                            <Button color="primary" className="w-md waves-effect waves-light" type="submit" >Registro</Button>}
                                    </Col>
                                </Row>
                            </AvForm>

                        </div>
                    </Card>
                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const { user, registrationError, loading } = state.Account;
    return { user, registrationError, loading };
}

export default connect(mapStatetoProps, { registerUser, emptyError })(Register);


// const validateEmail = (email) => {
//     let isValid = false
//     if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*$/.test(String(email).toLowerCase().trim()) && String(email).includes('udistrital')) {
//         isValid = true
//     }
//     return isValid
// }