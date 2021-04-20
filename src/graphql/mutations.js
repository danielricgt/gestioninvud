import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
    mutation createUser($id: Int!, $nombres: String!, $apellidos: String!, $correo: String!, $fk_dependencia: Int!, $fk_estado: Int = 1, $fk_rol: Int = 4, $password: String!, $cargo: String!) {
        insert_usuario(objects: { id: $id, nombres: $nombres, apellidos: $apellidos, correo: $correo, fk_dependencia: $fk_dependencia, fk_estado: $fk_estado }) {
            returning {
                id
            }
            affected_rows
        }
        insert_usuario_auth(objects: { fk_rol: $fk_rol, fk_usuario: $id, password: $password }) {
            returning {
                password
            }
            affected_rows
        }
        insert_usuario_cargo(objects: { fk_usuario: $id, cargo: $cargo }) {
            returning {
                cargo
            }
        }
    }
`

export const UPDATE_BIEN = gql`
    mutation editarBien($id: Int!, $descripcion: String, $observaciones: String, $fk_estado: Int, $espacio_fisico: String) {
        update_bien(where: { id: { _eq: $id } }, _set: { descripcion: $descripcion, observaciones: $observaciones, fk_estado: $fk_estado, espacio_fisico: $espacio_fisico }) {
            returning {
                id
            }
        }
    }
`

export const CREATE_COMPROBANTE_ENTRADA = gql`
    mutation crearBienEntrada(
        $clase_entrada: String = "",
        $tipo_contrato: String = "",
        $proveedor: String = "",
        $observaciones: String = "",
        $numero: Int = 1,
        $factura: String = "",
        $grupo: String = "",
        $unidad: Int = 1,
        $cantidad: Int = 1,
        $descripcion_comprobante: String = "",
        $valor_unitario: numeric = 0,
        $subtotal: numeric = 0,
        $porcentaje_iva: numeric = 0,
        $total_iva: numeric = 0,
        $total_cantidad: numeric = 0,
        $total_cantidad_entrada: numeric = 0,
        $subtotal_grupo: numeric = 0,
        $total_entrada: numeric = 0
    ) {
        insert_bien(objects: {
            fk_estado: 4,
            comprobante: {
                data: {
                    clase_entrada: $clase_entrada,
                    tipo_contrato: $tipo_contrato,
                    proveedor: $proveedor,
                    observaciones: $observaciones,
                    numero: $numero,
                    factura: $factura,
                    grupo: $grupo,
                    unidad: $unidad,
                    cantidad: $cantidad,
                    descripcion_comprobante: $descripcion_comprobante,
                    valor_unitario: $valor_unitario,
                    subtotal: $subtotal,
                    porcentaje_iva: $porcentaje_iva,
                    total_iva: $total_iva,
                    total_cantidad: $total_cantidad,
                    total_cantidad_entrada: $total_cantidad_entrada,
                    subtotal_grupo: $subtotal_grupo,
                    total_entrada: $total_entrada,
                    fk_estado: 8
                }
            }
        }) {
            returning {
                id
            }
        }
    }
`

export const EDIT_BIEN_SALIDA = gql`
    mutation editarBienSalida(
        $idBien: Int!,
        $fk_usuario: Int!,
        $descripcion: String = "",
        $tipo_bien: String = "",
        $placa: String!,
        $nombre: String = "",
        $marca_serie: String = "",
        $espacio_fisico: String = "",
        $idComprobante: Int!,
        $salida: String = ""
        $fecha_creacion: timestamptz! 
    ) {
        update_bien(where: { id: { _eq: $idBien } },
            _set: {
            fk_usuario: $fk_usuario,
            descripcion: $descripcion,
            tipo_bien: $tipo_bien,
            placa: $placa,
            nombre: $nombre,
            marca_serie: $marca_serie,
            fk_estado: 1,
            espacio_fisico: $espacio_fisico,
            fecha_creacion: $fecha_creacion
        }) {
            returning {
                id
            }
        }
        update_comprobante(where: { id: { _eq: $idComprobante } },
            _set: {
            fk_estado: 9,
            salida: $salida
        }) {
            affected_rows
        }
    }
`

// $fecha_creacion: timestamptz = now
