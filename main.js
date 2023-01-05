
const input = document.getElementById('input');
// получаем блок картинок(грид)
const grid = document.getElementsByClassName('grid')[0];

window.addEventListener('load',Theme);

input.addEventListener('keydown',function(event){
    
    if(event.key ==='Enter'){
        loadImg();
    }
}
);




function loadImg(){
    removeImg();

    const url = 'https://api.unsplash.com/search/photos/?query='+input.value+'&per_page=9&client_id=hpi3Bl8XtNXzSb5bgIW8QZbv8wUt8cjRTISWJMCRYlE';
    fetch(url)
 
    .then(response=> {
        if(response.ok){
           
            return response.json();
            
        }
        else{
            alert(response.status);
        }
    })
    // 2ой промис будет получать данные и выводить их,все картинки выводятся  массивом 
    .then(data=>{
        const NodeImgs = [];
        // вывод по циклу
        for(let i = 0; i<data.results.length;i++){
            NodeImgs[i]=document.createElement('div');
            NodeImgs[i].className='img';
            NodeImgs[i].style.backgroundImage='url('+data.results[i].urls.raw+"&w=1366&h=768" +')';
// возможность скачивать и открывать картинки в новом окне после двойного клика
            NodeImgs[i].addEventListener('dblclick',function(){
                window.open(data.results[i].links.download,'_blank');
            })
            grid.appendChild( NodeImgs[i]);
        }
    })
}


function removeImg(){
    grid.innerHTML='';
}



// реализация темной и светлой темы в зависимости от времени суток

function Theme(){
    const date = new Date();
    const hour = date.getHours();


    if(  hour > 19){
        document.body.style.backgroundColor = "#393F47";
        document.body.style.color = 'white';
        
    }
    else{
        document.body.style.backgroundColor = "whitesmoke";
        document.body.style.color = 'black';
    }
}

