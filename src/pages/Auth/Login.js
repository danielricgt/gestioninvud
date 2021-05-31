import React, { Component } from 'react';
import { Alert, Button, Col, Row, Card } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkLogin } from '../../store/actions';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import logo from './../../assets/universidad-logo.png'
//import BackgroundImage from './../../assets/login/login-hero.jpg'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { correo: "", password: "" }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event, values) {
        this.props.checkLogin(values.correo, values.password, this.props.history);
    }

    componentWillUnmount() {
        document.body.style.backgroundColor = '#f8f8fa !important';
    }


    render() {
   
        const errorMessage = 'El campo es requerido'
        return (
            <React.Fragment>
            <div className="bodyHero">
                
                <div className="container">
                    <Row>
                    <Col sm='12'> 
                        <br></br>
                        <img src={logo} style={{width:"200px", height:"200px", display:"block", marginLeft:"auto", marginRight:"auto"}} className="image" alt="Universidad Distrital"/>
                    </Col> 
                    </Row>
                </div>
                <div className="wrapper-page">
                    <Card className="overflow-hidden account-card mx-3">
                        <div className="bg-muted p-4 text-white text-center position-relative">
                            <h3 className="font-20 m-b-5">HERRAMIENTA DE APOYO A LA GESTI&Oacute;N DE INVENTARIOS DE LA UNIVERSIDAD DISTRITAL</h3>
                     
                        </div>

                        <div className="account-card-content" style={{paddingTop:"20px"}}>
                           {this.props.user && <Alert color="success">
                                Login éxitoso.</Alert>}

                            {this.props.loginError && <Alert color="danger">
                                {this.props.loginError}</Alert>}

                            <AvForm className="form-horizontal m-t-10" onValidSubmit={this.handleSubmit} >
                                <AvField name="correo" label="Usuario" value={this.state.correo} placeholder="Ingrese su usuario" type="text" validate={{
                                    required: { value: true, errorMessage: errorMessage },
                                    pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*$/, errorMessage: 'El usuario debe ser un correo institucional'}
                                }} />
                                <AvField name="password" label="Contraseña" value={this.state.password} placeholder="Ingrese su contraseña" type="password" validate={{
                                    required: { value: true, errorMessage: errorMessage },
                                }} />
                                <Row className="form-group m-t-20 text-center">
                                    <Col sm="12" className="text-center">
                                        <Button  className="w-md waves-effect waves-light btn-custom" type="submit">Iniciar sesión</Button>
                                    </Col>
                                </Row>

                                <Row className="form-group m-t-10 mb-0">
                                    <Col md="12" className="m-t-10 text-center">
                                        <Link to="/register">¿No tiene Cuenta?, Reg&iacute;strese.</Link>
                                    </Col>
                                </Row>
                            </AvForm>
                        </div>
                    </Card>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const { user, loginError, loading } = state.Login;
    return { user, loginError, loading };
}

export default withRouter(connect(mapStatetoProps, { checkLogin })(Login));



