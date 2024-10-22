
// import { storageService } from './async-storage.service.js'
import fs from 'fs'

import { utilService } from './util.service.js'

const bugs = utilService.readJsonFile('data/bugs.json')

// const STORAGE_KEY = 'bugDB'

// _createBugs()

export const bugService = {
    query,
    getById,
    save,
    remove,
}



function query() {
    return Promise.resolve(bugs)
}

function getById(bugId) {
    // return storageService.get(STORAGE_KEY, bugId)
    const bug = bugs.find(bug => bug._id === bugId)
    if (!bug) return Promise.reject('Cannot find bug', bugId)
    return Promise.resolve(bug)
}

function remove(bugId) {
    // return storageService.remove(STORAGE_KEY, bugId)
    const bugIdx = bugs.findIndex(bug => bug._id === bugId)
    if (bugIdx < 0) return Promise.reject('Cannot find bug', bugId)
    bugs.splice(bugIdx, 1)
    return _saveBugsToFile()
}

function save(bug) {
    // if (bug._id) {
    //     return storageService.put(STORAGE_KEY, bug)
    // } else {
    //     return storageService.post(STORAGE_KEY, bug)
    // }
    if (bugToSave._id) {
        const bugIdx = bugs.findIndex(bug => bug._id === bugToSave._id)
        bugs[bugIdx] = bugToSave
    } else {
        bugToSave._id = utilService.makeId()
        cars.unshift(bugToSave)
    }

    return _saveBugsToFile().then(() => bugToSave)
}

function _saveBugsToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(bugs, null, 4)
        fs.writeFile('data/bug.json', data, (err) => {
            if (err) {
                return reject(err)
            }
            resolve()
        })
    })
}


// function _createBugs() {
//     let bugs = utilService.loadFromStorage(STORAGE_KEY)
//     if (!bugs || !bugs.length) {
//         bugs = [
//             {
//                 title: "Infinite Loop Detected",
//                 severity: 4,
//                 _id: "1NF1N1T3"
//             },
//             {
//                 title: "Keyboard Not Found",
//                 severity: 3,
//                 _id: "K3YB0RD"
//             },
//             {
//                 title: "404 Coffee Not Found",
//                 severity: 2,
//                 _id: "C0FF33"
//             },
//             {
//                 title: "Unexpected Response",
//                 severity: 1,
//                 _id: "G0053"
//             }
//         ]
//         utilService.saveToStorage(STORAGE_KEY, bugs)
//     }



// }
