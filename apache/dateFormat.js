let dateFormat = function (dateStr, pattern) {
    let date = new Date(dateStr),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();
    month.toString().length < 2 ? month = '0' + month : null;
    day.toString().length < 2 ? day = '0' + day : null;
    if (pattern.toLowerCase() != 'y-m-d') {
        let h = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();
        h.toString().length < 2 ? h = '0' + h : null;
        m.toString().length < 2 ? m = '0' + m : null;
        s.toString().length < 2 ? s = '0' + s : null;
        return `${year}-${month}-${day} ${h}:${m}:${s}`;
    } else {
        return `${year}-${month}-${day}`;
    }
}