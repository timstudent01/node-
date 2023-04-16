const renderHTML = ((url) => {
    switch (url) {
        case "/home":
            return `
            <html>
                <a href="/list">list</a>
                <div>這是home頁面</div>
            </html>
            `
        case "/list":
            return `
            <html>
                <a href="/home">home</a>
                <div>這是list頁面</div>
            </html>
            `
        default :
        return `
        <html>
            <div>404 not found</div>
        </html>
        `
    }

})

module.exports = {
    renderHTML
}