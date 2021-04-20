import * as mutation from './../graphql/mutations';
import * as queries from './../graphql/queries'
import client from './../graphql/client';

// QUERIES
export const get_bienes = async data => {
    return await client.query({
        query: queries.GET_BIENES,
        variables: data,
        fetchPolicy: 'no-cache'
    })
}

export const getBienIdByFactura = async data => {
    return await client.query({
        query: queries.GET_BIEN_BY_FACTURA,
        variables: data,
    })
}

export const getBienComprobanteByIdBien = async data => {
    return await client.query({
        query: queries.GET_BIEN_COMPROBANTE_BY_ID,
        variables: data,
    })
}

export const getUsuarioById = async data => {
    return await client.query({
        query: queries.GET_USUARIO_BY_ID,
        variables: data,
    })
}

// MUTATIONS

export const update_bien = async data => {
    return await client.mutate({
        mutation: mutation.UPDATE_BIEN,
        variables: data,
    })
}

export const create_comprobante_bien = async data => {
    return await client.mutate({
        mutation: mutation.CREATE_COMPROBANTE_ENTRADA,
        variables: data,
    })
}

export const editarBienSalida = async data => {
    return await client.mutate({
        mutation: mutation.EDIT_BIEN_SALIDA,
        variables: data,
    })
}