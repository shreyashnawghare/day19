function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

let data;

readTextFile("pagination.json", function (text) {

    let select = document.getElementById('count');
    for (let i = 1; i <= 100; i++) {
        let option = createHTMLElement('option', i);
        option.value = i;
        if (i == 10) {
            option.selected = true;
        }
        select.appendChild(option);
    }

    data = JSON.parse(text);
    showData(0, 10);
    createPage(10);

});

createHTMLElement = (ele, val = '') => {
    let element = document.createElement(ele);
    element.innerHTML = val;
    return element;
}

pagination = (ele) => {
    showData(0, ele.value);
    createPage(ele.value);
}

showData = (start, end, btnId = '') => {

    if (btnId) {
        let qs = document.querySelector('.active');
        if (qs)
            qs.removeAttribute('class', 'active');

        let btn = document.getElementById(btnId);
        btn.setAttribute('class', 'active');
    }

    let table = document.getElementById('my-table');
    table.innerHTML = '';
    let tr = document.createElement('tr');
    tr.classList.add('th');
    let thd1 = createHTMLElement('td', '#');
    let thd2 = createHTMLElement('td', 'Name');
    let thd3 = createHTMLElement('td', 'Email');
    tr.append(thd1, thd2, thd3);
    table.appendChild(tr);

    if (end > data.length) {
        end = 100;
    }
    for (let i = start; i < end; i++) {
        let tr = document.createElement('tr');
        let td1 = createHTMLElement('td', data[i].id);
        let td2 = createHTMLElement('td', data[i].name);
        let td3 = createHTMLElement('td', data[i].email);
        tr.append(td1, td2, td3);
        table.appendChild(tr);
    }
}

createPage = (count) => {

    let total = Math.ceil(data.length / count);
    let pageBox = document.getElementById('pagination');
    pageBox.innerHTML = '';

    let first = createHTMLElement('a', 'First');
    first.href = '#';
    first.setAttribute('title', 'first');
    first.setAttribute('onclick', `showData(0,${count},"btn-1")`);
    pageBox.appendChild(first);

    let pre = createHTMLElement('a', '&laquo;');
    pre.href = '#';
    pre.setAttribute('title', 'previous');
    pre.setAttribute('onclick', `nextPage('first')`);
    pageBox.appendChild(pre);

    let end, i;
    for (i = 1; i <= total; i++) {
        end = i * count;
        let anchor = createHTMLElement('a', i);
        anchor.href = '#';
        anchor.setAttribute('id', `btn-${i}`);
        anchor.setAttribute('onclick', `showData(${end-count},${end},"btn-${i}")`);
        if (i == 1)
            anchor.setAttribute('class', 'active');
        pageBox.appendChild(anchor);

    }

    let next = createHTMLElement('a', '&raquo;');
    next.href = '#';
    next.setAttribute('title', 'next');
    next.setAttribute('onclick', `nextPage('next')`);
    pageBox.appendChild(next);

    let last = createHTMLElement('a', 'Last');
    last.href = '#';
    last.setAttribute('title', 'last');
    last.setAttribute('onclick', `showData(${end-count},${end},"btn-${i-1}")`);
    pageBox.appendChild(last);
}

nextPage=(move)=>{

    let qs = document.querySelector('.active');
    let idVal=qs.getAttribute('id').split('-');
    if(move=='next'){
        let next=document.getElementById(`btn-${+(idVal[1]) + 1}`);
        if(next)
            eval(next.getAttribute('onclick'));
    }
    else{
        let first=document.getElementById(`btn-${+(idVal[1]) - 1}`);
        if(first)
            eval(first.getAttribute('onclick'));
    }  
}