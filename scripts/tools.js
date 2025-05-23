import { profileAPI } from "./API.js"
import { querys } from "./querys.js"


export async function finishProject() {
    let project = await profileAPI(querys.project)

    const projectContainer = document.createElement("div")
    projectContainer.setAttribute("class", "pro-container")
    projectContainer.innerHTML = `
    <h2> Projects </h2> `

    project.transaction.forEach(proj => {
        const bar = document.createElement("div")
        bar.setAttribute("class", "project-bar")

        bar.innerHTML = `
         <div class="bar">
            <p class="project-name">${proj.object.name}</p>
            <p class="project-xp">${xpCount(proj.amount)}</p>
            <p class="project-date">${new Date(proj.createdAt).toLocaleString()}</p>
           <p class="project-member">  ${proj.object.progresses[0].group.members
                .map(member => `<a class="member-link" href="https://learn.zone01oujda.ma/git/${member.userLogin}" target="_blank">${member.userLogin}</a>`).join(' ')
            }  </p>
            
        </div> 
        `

        projectContainer.append(bar)
    })


    return projectContainer
}


let USER = {
    id: 0,
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    campus: "",
    auditRatio: 0,
    addressCity: "",
    createdAt: "",
    gender: "",
    tel: "",
    country: "",
}



export async function insertUser() {

    const dataUser = await profileAPI(querys.user)

    USER.id = dataUser.user[0].id
    USER.username = dataUser.user[0].login
    USER.firstName = dataUser.user[0].firstName
    USER.lastName = dataUser.user[0].lastName
    USER.email = dataUser.user[0].email
    USER.campus = dataUser.user[0].campus
    USER.auditRatio = dataUser.user[0].auditRatio.toFixed(1)
    USER.addressCity = dataUser.user[0].attrs.addressCity
    USER.createdAt = new Date(dataUser.user[0].createdAt).toLocaleString()
    USER.gender = dataUser.user[0].attrs.gender
    USER.tel = dataUser.user[0].attrs.tel
    USER.country = dataUser.user[0].attrs.country


    return USER
}



let skillLevels = []




export async function getSkillLevels() {
    const skill = await profileAPI(querys.skill)
    const result = skill.user[0].transactions.reduce((acc, c) => {
        acc[c.type] = c.amount
        return acc
    }, {})

    skillLevels.push(result)

    return skillLevels
}


export function xpCount(xp) {
    let p = xp / 1000
    let MXP = ""

    if (p > 1000) {
        MXP = `${p.toFixed(2) / 100} MB`
    } else {
        MXP = `${p.toFixed(2)} KB`
    }

    return MXP
}

