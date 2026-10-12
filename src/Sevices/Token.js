export const setToken = (Token)=>{
    window.localStorage.setItem("Mixel",Token)
}

export const getToken = ()=>{
    window.localStorage.getItem("Mixel")
}

