import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/dashboard';
import Levantamiento from './pages/Levantamiento/levantamiento';
import ComprobanteSalida from './pages/IngresoBien/comprobanteSalida';
import ComprobanteEntrada from './pages/IngresoBien/comprobanteEntrada';
import TrasladoDependencia from './pages/Traslado/trasladoDependencia'
import TrasladoIndividual from './pages/Traslado/trasladoIndividual'
import Transacciones from './pages/Transacciones/transacciones';
import Profile from './pages/Profile/profile';
import Notifications from './pages/Notifications/notifications';
import AprobacionBajaBien from './pages/Aprobaciones/aprobacionesBaja'
import AprobacionIngresoEntrada from './pages/Aprobaciones/aprobacionesIngresoEntrada'
import AprobacionIngresoSalida from './pages/Aprobaciones/aprobacionesIngresoSalida'
import AprobacionLevantamiento from './pages/Aprobaciones/aprobacionesLevantamientos'
import BajaBien from './pages/Bienes/bajaBien'
import AltaBien from './pages/Bienes/altaBien'
import AprobacionTraslado from './pages/Aprobaciones/aprobacionesTraslado'
import AprobacionDependencia from './pages/Aprobaciones/aprobacionesDependencia'

import Logout from './pages/Auth/Logout';
import Register from './pages/Auth/Register';

const routes = [

    // public Routes
    { path: '/login', component: Login, ispublic: true },
    { path: '/logout', component: Logout, ispublic: true },
    { path: '/register', component: Register, ispublic: true },
    
    // Dashboard
    // { path: '/principal', component: Dashboard },
    { path: '/levantamiento', component: Levantamiento },
    { path: '/comprobante-salida', component: ComprobanteSalida },
    { path: '/comprobante-entrada', component: ComprobanteEntrada },
    { path: '/traslado-dependencia', component: TrasladoDependencia },
    { path: '/traslado-individual', component: TrasladoIndividual },
    { path: '/transacciones', component: Transacciones },
    { path: '/configuracion', component: Profile },
    { path: '/notificaciones', component: Notifications },
    { path: '/aprobacion-baja-bien', component: AprobacionBajaBien },
    { path: '/aprobacion-levantamiento', component: AprobacionLevantamiento },
    { path: '/aprobacion-ingreso-entrada', component: AprobacionIngresoEntrada },
    { path: '/aprobacion-ingreso-salida', component: AprobacionIngresoSalida },
    { path: '/aprobacion-traslado-individual', component: AprobacionTraslado },
    { path: '/aprobacion-traslado-dependencia', component: AprobacionDependencia },
    { path: '/baja-bien', component: BajaBien },
    { path: '/alta-bien', component: AltaBien },

    // Auht
    { path: '/', component: Dashboard },
];

export default routes;