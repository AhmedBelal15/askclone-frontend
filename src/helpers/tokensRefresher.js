const tokensRefresher = (res) => {
    if (res.tokens !== undefined){
        localStorage.setItem('accessToken', JSON.stringify(res.tokens.accessToken))
        localStorage.setItem('refreshToken', JSON.stringify(res.tokens.refreshToken))
    }
}

export default tokensRefresher