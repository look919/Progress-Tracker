import {createTracker, findByName} from './trackers'
import {renderDOM, renderMainSide} from './views' 


const hash = location.hash.substr(1);   //hash



document.querySelector('#createTracker').addEventListener('click', ()=>{       //creating new tracker
    createTracker();
})

document.querySelectorAll('.list__item').forEach((e) => {                           //rendering leftside nav and trackers
    const trimmedHash = e.textContent.trim()
    if(hash === trimmedHash || (hash === '' && trimmedHash === 'ProgressTracker')){
        e.setAttribute('class', 'list__item list__item--active')
        renderDOM(hash)
    }
    else{
        e.setAttribute('class', 'list__item')
    }
})

/*
if(hash === ''){
    renderMainSide();
} */



const buttons = document.querySelectorAll('.btn--tracker')         //adding edit.html assigment to trackers



buttons.forEach((e)=>{ 
    e.addEventListener('click', () =>{
    const editTracker = findByName(e.children[0].textContent)

    location.assign(`/edit.html#${editTracker.id}`)
    })
})




window.onhashchange = () =>{                                    //reloading page after changes in JSON
    window.location.reload()
}

