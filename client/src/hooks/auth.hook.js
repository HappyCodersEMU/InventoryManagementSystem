import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [ready, setReady] = useState(null)
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [hasCompany, setHasCompany] = useState(null)

    const login = useCallback((jwtToken, id, hasCompanyState) => {
        setToken(jwtToken)
        setUserId(id)
        setHasCompany(hasCompanyState)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, hasCompany: hasCompanyState
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setHasCompany(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) {
            login(data.token, data.userId, data.hasCompany)
        }
        setReady(true)
    }, [login])

    return { login, logout, token, userId, ready, hasCompany }
}