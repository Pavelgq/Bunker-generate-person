const dropArea = document.getElementById('drop-area');
const generate = document.querySelector('.generate');

const data = [];

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});
['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

function highlight(e) {
    dropArea.classList.add('highlight');
}

function unhighlight(e) {
    dropArea.classList.remove('highlight');
}

dropArea.addEventListener('drop', handleDrop, false)

function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;
    handleFiles(files);
};

// function handleFiles(files) {
//     ([...files]).forEach(uploadFile)
// }
function handleFiles(files) {
    files = [...files];
    files.forEach(uploadFile);
    files.forEach(previewFile);
}

function uploadFile(file) {

    let formData = [];
    formData.push('file', file);
    console.log(file, formData);
    // fetch(url, {
    //         method: 'POST',
    //         body: formData
    //     })
    //     .then(() => {
    //         /* Готово. Информируем пользователя */ })
    //     .catch(() => {
    //         /* Ошибка. Информируем пользователя */ })
}

function previewFile(file) {
    let reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onloadend = function () {
       console.log(file.name);
        data.push(file.name.replace('.txt','') + '\n' + reader.result);
        
        let img = document.createElement('img');
        img.src = "./image/file-checked.svg";
        img.alt = file.name;
        document.getElementById('gallery').appendChild(img);
    }
}

generate.addEventListener('click', generatePerson);

function generatePerson() {
    if (data.length == 0) {
        alert("Вы не выбрали файлы");
        return 1;
    }
    let myData = [];
    let result = [];

    data.forEach(element => {
        let text = element.split('\n');
        
        if (radioTitle.checked) {
           text.splice(0, 1);
        }

        myData.push(text);
        if (person.value > text.length - 1) {
            alert("Персонажей не может быть больше, чем характеристик");
            return 1;
        }
    });



    for (let index = 0; index < person.value * 1; index++) {
        result[index] = 'Сгенерированные данные:' + '\n';
        console.log(myData)
        myData.forEach(element => {
            let num = randomNumber(element.length);
            result[index] +=element[0] + " " + element[num] + "\n";
            element.splice(num, 1);
        });
        writeFile(title.value + '_' + (index+1), result[index]);
        console.log(result);
    }

}

function randomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max-1))+1;
}


function writeFile(name, value) {
    var val = value;
    if (value === undefined) {
        val = "";
    }
    var download = document.createElement("a");
    download.href = "data:text/plain;content-disposition=attachment;filename=file," + val;
    download.download = name;
    download.style.display = "none";
    download.id = "download";
    document.body.appendChild(download);
    document.getElementById("download").click();
    document.body.removeChild(download);
}