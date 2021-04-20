import { gql } from '@apollo/client';

export const GET_SEDE_DEPENDENCIES = gql`
    query getSedeAndDepdendencies {
        sede(order_by: {id: asc}) {
            sede
            id
            dependencia {
                dependencia
                id
            }
        }
    }
`;

export const LOGIN_USER = gql`
    query loginUsuario($correo: String!, $password: String!) {
        usuario(where: { correo: { _eq: $correo }, _and: { auth: { password: { _eq: $password } } } }) {
            id
            nombres
            apellidos
            correo
            verificado
            estado {
                estado
                id
            }
            cargos {
                cargo
                id
            }
            auth {
                rol {
                    rol
                    id
                }
            }
            dependencia {
                dependencia
                id
                sede {
                    sede
                    id
                }
            }
        }
    }
`

export const GET_BIENES = gql`
    query getBienes($idSede: Int!) {
        bien(order_by: {fecha_creacion: desc}) {
            placa
            descripcion
            usuario {
                nombres
                apellidos
                id
                dependencia {
                dependencia
                id
                sede {
                    sede
                    id
                }
                }
            }
            espacio_fisico
            observaciones
            id
            nombre
            marca_serie
            estado {
                estado
                id
            }
            comprobante {
                proveedor
            }
        }
        dependencia(where: {fk_sede: {_eq: $idSede}}) {
            id
            dependencia
            fk_sede
        }
    }
`

export const GET_BIEN_BY_FACTURA = gql`
    query getBienIdByFactura($factura: String!) {
        bien(where: { comprobante: { factura: { _eq: $factura } } }) {
            id
        }
    }
`

export const GET_USUARIO_BY_ID = gql`
    query getUsuarioById($id: Int!) {
        usuario(where: { id: { _eq: $id } }) {
            nombres
            apellidos
            id
            dependencia {
                dependencia
                id
                sede {
                    sede
                    id
                }
            }
        }
    }
`

export const GET_BIEN_COMPROBANTE_BY_ID = gql`
    query getBienComprobanteByIdBien($id: Int!) {
        bien(where: { id: { _eq: $id } }) {
            id
            comprobante {
                cantidad
                clase_entrada
                descripcion_comprobante
                factura
                fecha_creacion
                fk_estado
                grupo
                id
                numero
                observaciones
                porcentaje_iva
                proveedor
                subtotal
                subtotal_grupo
                tipo_contrato
                total
                total_cantidad
                total_cantidad_entrada
                total_entrada
                total_iva
                unidad
                valor_unitario
            }
        }
    }
`



// query getBienComprobanteByIdBien($id: Int! = 1) {
//     bien(where: { id: { _eq: $id } }) {
//         id
//         comprobante {
//             cantidad
//             clase_entrada
//             descripcion_comprobante
//             factura
//             fecha_creacion
//             fk_estado
//             grupo
//             id
//             numero
//             observaciones
//             porcentaje_iva
//             proveedor
//             subtotal
//             subtotal_grupo
//             tipo_contrato
//             total
//             total_cantidad
//             total_cantidad_entrada
//             total_entrada
//             total_iva
//             unidad
//             valor_unitario
//         }
//     }
// }