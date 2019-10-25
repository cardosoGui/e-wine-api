import React, { useState, useEffect } from 'react'

export default function $ModelsContainer({ key, children }) {

    const [ state, setState ] = useState({
        $models: [],
        loading: true,
        error: null
    })

    /**
     * 
     * @param {import('axios').AxiosInstance} api 
     */
    async function fetchData(api) {
        setState({ loading: true, error: null })
        try {
            const { data: $models } = await api.get(`/$models`)
            setState({ ...state, $models, loading: false })
        }
        catch (e) {
            if (e.response)
                setState({
                    ...state,
                    error: {
                        payload: e.response.data
                    }
                })
            else
                setState({ ...state, error: {} })
        }
    }

    useEffect(() => {
        fetchData(api)
    }, [ key ])

    if (state.error) {
        return (
            <div>
                <p style={{ textAlign: 'center' }}>
                    Ocorreu um erro ao obter os dados.
                </p>
                <p style={{ textAlign: 'center' }}>
                    <a href="javascript:void(0)" onClick={fetchData}>
                        Tentar novamente
                    </a>
                </p>
            </div>
        )
    }

    if (state.loading) {
        return (
            <div>
                <p style={{ textAlign: 'center' }}>
                    Carregando...
                </p>
            </div>
        )
    }

    return children(state.$models)
}