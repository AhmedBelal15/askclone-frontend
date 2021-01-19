import create from 'zustand'

const useStore = create(set => ({
    login: false,
    setLogin: ()=> set({login: true}),
    setLogout: ()=>set({login: false})
}))

export default useStore