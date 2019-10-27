import {getTrackers} from './trackers'

const trackers = getTrackers()


const renderDOM = (hash) => {

    if(hash === ''){
        renderMainSide()
    }
    else {

        const main = document.querySelector('#content')
        main.innerHTML="";

        const header = document.createElement('h2')                                 //SETTING PROPERTIRES
        header.setAttribute('class','heading-secondary')
        const button = document.createElement('button')
        button.setAttribute('class', 'btn btn--tracker margin-bottom')
        const progress = document.createElement('span')
        const title = document.createElement('h3')
        title.setAttribute('class','heading-tertiary')
        progress.setAttribute('class', 'btn--progress')
        const update = document.createElement('span')
        update.setAttribute('class', 'btn--update')
        
        button.appendChild(title)
        button.appendChild(progress)
        button.appendChild(update)

        let newTrackers

        header.textContent = hash
        main.innerHTML = header.outerHTML

        newTrackers = trackers.filter((e) => e.category.toLowerCase() === hash.toLowerCase())
        newTrackers.forEach((e) => {

            title.textContent = e.name
            progress.textContent = `Progress: ${e.progress}%`
            update.textContent = `Last update: ${e.updates[e.progress/5]}`
                
            main.innerHTML +=  button.outerHTML
        })

            
    }

}

const renderSingleTracker = (tracker) => {

    const main = document.querySelector('#content')
    main.innerHTML="";

    const header = document.createElement('h2')                                 //SETTING PROPERTIRES
    header.setAttribute('class','heading-secondary')
    const progress = document.createElement('h3')
    progress.setAttribute('class','heading-tertiary color-black')
    const update = document.createElement('h3')
    update.setAttribute('class', 'heading-tertiary color-black')
    const historyHead = document.createElement('h2')                                 //SETTING PROPERTIRES
    historyHead.setAttribute('class','heading-secondary margin-top')
    const historyBody = document.createElement('div')  

    header.textContent = tracker.name
    progress.textContent = `Current progress: ${tracker.progress}%`
    update.textContent = `Last update: ${tracker.updates[tracker.progress/5]}`
    
    for(let i=0;i<21;i++){

        let checkingNotesValue = tracker.notes[i]; 
        let checkingUpdatesValue = tracker.updates[i];

        if((checkingNotesValue !== 'Created later!') && checkingNotesValue !== ''){
            checkingNotesValue = `${i*5}%: ${tracker.notes[i]}`
            checkingUpdatesValue = `${tracker.updates[i]}`
        } else if (checkingNotesValue === 'Created later!'){
            checkingNotesValue = `${i*5}%: Created later!`
            checkingUpdatesValue = ''
        } else {
            checkingNotesValue = `${i*5}%:`
            checkingUpdatesValue = ''
        }

        
        const historyText = document.createElement('div')

        historyText.textContent =  `${checkingNotesValue} ${checkingUpdatesValue}`
        historyBody.appendChild(historyText)
    }
    historyHead.textContent = 'History'

    main.appendChild(header)                //construction
    main.appendChild(progress)
    main.appendChild(update)
    main.appendChild(historyHead)
    main.appendChild(historyBody)
}


const renderProgress = () => {

        const progressContent = document.querySelector('#progress-content')

        const span = document.createElement('span');
        span.setAttribute('class','font-11');
        span.textContent = 'Leave a note, to keep in mind what you have learned'
        const textArea = document.createElement('textarea')
        textArea.setAttribute('cols','30')
        textArea.setAttribute('rows','7')
        textArea.setAttribute('class','form__textarea margin-bottom');
        textArea.setAttribute('id','progress-note')
        const button = document.createElement('button')
        button.setAttribute('class','btn margin-top')
        button.setAttribute('id','progress-add')
        button.textContent = 'Add progress'

        progressContent.appendChild(span)
        progressContent.appendChild(textArea)
        progressContent.appendChild(button)

}

const renderMainSide = () => {
    const content = document.querySelector('#content')

    const header = document.createElement('h2');
    header.setAttribute('class','heading-secondary margin-bottom')
    header.textContent = 'Welcome'
    const message = document.createElement('h3')
    message.setAttribute('class','heading-tertiary color-black')
    message.textContent = 'ProgressTracker is a simple application that helps you keeping records of your learning achievments, feel free to use. Technologies used: HTML5, CSS3, Sass, Javascript, Babel, Webpack, JSON.'

    content.appendChild(header)
    content.appendChild(message)
}


export {renderDOM, renderSingleTracker, renderProgress, renderMainSide}