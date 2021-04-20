import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Breadcrumb, BreadcrumbItem,} from 'reactstrap';
import { activateAuthLayout } from '../../store/actions';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SettingMenu from '../Subpages/Settingmenu';

import 'chartist/dist/scss/chartist.scss';


//Images
import img1 from '../../images/services-icon/01.png';
import img2 from '../../images/services-icon/02.png';
import img3 from '../../images/services-icon/03.png';
import img4 from '../../images/services-icon/04.png';


class Transacciones extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        document.body.style.backgroundColor = '#f8f8fa'
        this.props.activateAuthLayout();
    }

    render() {
        return (
            <React.Fragment>
                <Container fluid>
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col sm="6">
                                <h4 className="page-title">Transacciones</h4>
                                <Breadcrumb>
                                    <BreadcrumbItem active>Welcome to UD Dashboard</BreadcrumbItem>
                                </Breadcrumb>
                            </Col>
                            <Col sm="6">
                                <div className="float-right d-none d-md-block">
                                    <SettingMenu />
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <Row>
                        <Col xl="3" md="6">
                            <Card className="mini-stat bg-primary text-white">
                                <CardBody>
                                    <div className="mb-4">
                                        <div className="float-left mini-stat-img mr-4">
                                            <img src={img1} alt="" />
                                        </div>
                                        <h5 className="font-16 text-uppercase mt-0 text-white-50">Orders</h5>
                                        <h4 className="font-500">1,685 <i className="mdi mdi-arrow-up text-success ml-2"></i></h4>
                                        <div className="mini-stat-label bg-success">
                                            <p className="mb-0">+ 12%</p>
                                        </div>
                                    </div>
                                    <div className="pt-2">
                                        <div className="float-right">
                                            <Link to="#" className="text-white-50"><i className="mdi mdi-arrow-right h5"></i></Link>
                                        </div>
                                        <p className="text-white-50 mb-0">Since last month</p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xl="3" md="6">
                            <Card className="mini-stat bg-primary text-white">
                                <CardBody>
                                    <div className="mb-4">
                                        <div className="float-left mini-stat-img mr-4">
                                            <img src={img2} alt="" />
                                        </div>
                                        <h5 className="font-16 text-uppercase mt-0 text-white-50">Revenue</h5>
                                        <h4 className="font-500">52,368 <i className="mdi mdi-arrow-down text-danger ml-2"></i></h4>
                                        <div className="mini-stat-label bg-danger">
                                            <p className="mb-0">- 28%</p>
                                        </div>
                                    </div>
                                    <div className="pt-2">
                                        <div className="float-right">
                                            <Link to="#" className="text-white-50"><i className="mdi mdi-arrow-right h5"></i></Link>
                                        </div>
                                        <p className="text-white-50 mb-0">Since last month</p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xl="3" md="6">
                            <Card className="mini-stat bg-primary text-white">
                                <CardBody>
                                    <div className="mb-4">
                                        <div className="float-left mini-stat-img mr-4">
                                            <img src={img3} alt="" />
                                        </div>
                                        <h5 className="font-16 text-uppercase mt-0 text-white-50">Average Price</h5>
                                        <h4 className="font-500">15.8 <i className="mdi mdi-arrow-up text-success ml-2"></i></h4>
                                        <div className="mini-stat-label bg-info">
                                            <p className="mb-0"> 00%</p>
                                        </div>
                                    </div>
                                    <div className="pt-2">
                                        <div className="float-right">
                                            <Link to="#" className="text-white-50"><i className="mdi mdi-arrow-right h5"></i></Link>
                                        </div>
                                        <p className="text-white-50 mb-0">Since last month</p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xl="3" md="6">
                            <Card className="mini-stat bg-primary text-white">
                                <CardBody>
                                    <div className="mb-4">
                                        <div className="float-left mini-stat-img mr-4">
                                            <img src={img4} alt="" />
                                        </div>
                                        <h5 className="font-16 text-uppercase mt-0 text-white-50">Product Sold</h5>
                                        <h4 className="font-500">2436 <i className="mdi mdi-arrow-up text-success ml-2"></i></h4>
                                        <div className="mini-stat-label bg-warning">
                                            <p className="mb-0">+ 84%</p>
                                        </div>
                                    </div>
                                    <div className="pt-2">
                                        <div className="float-right">
                                            <Link to="#" className="text-white-50"><i className="mdi mdi-arrow-right h5"></i></Link>
                                        </div>

                                        <p className="text-white-50 mb-0">Since last month</p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>


                </Container>

            </React.Fragment>
        );
    }
}

export default withRouter(connect(null, { activateAuthLayout })(Transacciones));