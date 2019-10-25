import React, { useState, useContext, useEffect } from 'react'

const FormContext = React.createContext({
    form: {},
    setForm() {},
})

const typeDefs = $types

const createField = name => {

    const { form, setForm } = useContext(FormContext)

    const update = event =>
        setForm({
            ...form,
            [name]: event.target.value
        })

    switch (typeDefs[name]) {
        default:
            return (
                <input name={name} onChange={update} />
            )
    }
}

export default function $ModelFormContainer({ key }) {

    const [ form, setForm ] = useState({
        $fields
    })

    const [ state, setState ] = useState({
        loadingInfo: "$method" === "PUT",
        formErrors: {},
        error: null,
        sendError: null,
        loading: false
    })

    async function fetchInfo(id) {
        setState({ ...state, error: null, loadingInfo: true })
        try {
            const { data } = await api.get(`/$models/${id}`)
            setForm(data)
            setState({ ...state, loadingInfo: false })
        }
        catch (e) {
            setState({ ...state, error: true })
        }
    }

    useEffect(() => {
        if ("$method" === "PUT") {
            // extract id here from navigations params
            fetchInfo(id)
        }
    }, [ key ])

    /**
     * 
     * @param {import('axios').AxiosInstance} api 
     */
    async function onSubmit(api) {
        setState({ ...state, loading: true, sendError: null })
        try {
            const { status, data } = await api.$methodL('/$models')
            if (status === 200) {
                // handle success
            }
        }
        catch (e) {
            // handle error
            setState({ ...state, loading: false, sendError: true })
        }
    }

    if (state.loadingInfo) {
        return (
            <div>
                <p> Carregando... </p>
            </div>
        )
    }

    if (state.error) {
        return (
            <div>
                <p style={{ textAlign: 'center' }}> Ocorreu um erro ao obter os dados. </p>
                <p style={{ textAlign: 'center' }}>
                    <a href="javascript:void(0)" onClick={fetchInfo}> Tentar novamente </a>
                </p>
            </div>
        )
    }

    return (
        <FormContext.Provider value={{ form, setForm }}>
            <form action="javascript:void(0)" onSubmit={() => onSubmit(api)}>
                $iterateFields
            </form>
        </FormContext.Provider>
    )
}