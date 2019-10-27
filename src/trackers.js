import uuidv4 from 'uuid/v4'
import moment from 'moment'

let trackers = []

const loadTrackers = () => {
    
    const dataJSON = localStorage.getItem('trackers')

    try {
       return dataJSON ? JSON.parse(dataJSON) : []
    } catch (e) {
        return []
    }
}

const saveTrackers = () => {
    localStorage.setItem('trackers', JSON.stringify(trackers))
}

const getTrackers = () => trackers;

const createTracker = () => {
    const id = uuidv4()                                                                 //id

    let category = document.querySelector('#create-course')                             //category
    if(category.checked){
        category = "courses"
    } else{
        category = document.querySelector('#create-project')
        if(category.checked){
            category = "projects"
        }else{
            category = document.querySelector('#create-other')
            category = "others"
        }
    }

    let name = document.querySelector('#create-trackerName').value;                     //name
    let progress = document.querySelector('#create-trackerProgress').value              //progress
    progress = Number(progress)
    if(progress%5 !== 0){
        progress = Number(progress)/10;  
        progress = Math.round(progress)
        progress *= 10;
    }

    let arrayNotes = [];                                                                //notes
    let arrayUpdate = [];                                                               //updateTime

    let notes = document.querySelector('#create-trackerNote').value;
    let update = moment().format('DD/MM/YY HH:mm')


    for(let i=0; i<=100;i+=5){                                                            //creating history
        i < progress ? arrayNotes.push(`Created later!`) : (i === progress ? arrayNotes.push(`${notes}`) : arrayNotes.push(''))      

        i < progress ? arrayUpdate.push(`Created later!`) : (i === progress ? arrayUpdate.push(`${update}`) : arrayUpdate.push(''));
    }


    trackers.push({                                                                        //pushing data
        id: id,
        category: category,
        name: name,
        progress: progress,
        notes: arrayNotes,
        updates: arrayUpdate
    })
    
    saveTrackers()
}

const removeTracker = (trackerId) => {
    
    const trackerIndex = trackers.findIndex((tr) => tr.id === trackerId)

    if (trackerIndex > -1) {
        trackers.splice(trackerIndex, 1)
        saveTrackers()
    }
}

const makeProgress = (tracker) => {
    if(tracker.progress >= 95){
        tracker.category = 'completed'
    } 


    tracker.progress += 5;

    let note = document.querySelector('#progress-note').value
    note === '' ? note = 'No information on the progress achieved' : note = note

    tracker.notes[tracker.progress/5] = note
    console.log(tracker.notes[tracker.progress/5])
    tracker.updates[tracker.progress/5] = moment().format('DD/MM/YY HH:mm') 

    saveTrackers()
}

const findByName = (el) => trackers.find((i) => i.name === el) 

const findById = (id) => trackers.find((i) => i.id === id) 



trackers = loadTrackers()

export {loadTrackers,getTrackers,createTracker, removeTracker, makeProgress, findByName, findById}