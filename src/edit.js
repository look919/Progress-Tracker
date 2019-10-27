import {removeTracker, makeProgress, findById} from './trackers'
import {renderSingleTracker, renderProgress} from './views'


const hash = location.hash.substr(1);   //hash

const currentTracker = findById(hash)   //tracker

renderSingleTracker(currentTracker)

if(currentTracker.progress <= 95) {
    renderProgress ()
} 
document.querySelector('#remove').addEventListener('click',() =>{
    removeTracker(currentTracker.id)
    location.assign('index.html')
})

document.querySelector('#progress-add').addEventListener('click', () => {
    makeProgress(currentTracker)
    location.reload();
})