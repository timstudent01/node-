const renderStatus = ((url)=>{
    // 創建一個陣列 如果req.url不是這兩個其中之一 就返回404
    const arr = ["/home","/list"]
    return arr.includes(url)?200:404
})

module.exports = {
    renderStatus
}