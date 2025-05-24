import { loginAPI, profileAPI } from "./API.js"
import { querys } from "./querys.js"
import { finishProject, getSkillLevels, insertUser, xpCount } from "./tools.js"




export async function showProfile() {

    // user information

    const USER = await insertUser()

    document.body.innerHTML = `
     <header>
        <div class="icon-zone">
         <p id="${USER.id}" class="name-talent"> Wellcome, ${USER.username}</p>
        </div>

        <div>
            <button class="log-out">Log-out</button>
        </div>
    </header>
    `
    const grid = document.createElement("div")
    grid.setAttribute("class", "grid-stat")



    const conntainer = document.createElement("div")
    conntainer.setAttribute("class", "container")
    conntainer.innerHTML = `
      <div class="user-info">
    
        <h2>User Information</h2>

        <p> <span> Username: </span>  ${USER.username} </p>
        <p> <span> First Name: </span> ${USER.firstName} </p>
        <p> <span> Last Name: </span> ${USER.lastName} </p>
        <p> <span> Email: </span> ${USER.email} </p>
        <p> <span> Campus: </span> ${USER.campus} </p>
        <p> <span> Account Created: </span> ${USER.createdAt} </p>
        <p> <span> Audit Ratio: </span> ${USER.auditRatio} </p>
        <p> <span> Address City: </span> ${USER.addressCity} </p>
        <p> <span> Gender: </span> ${USER.gender} </p>
        <p> <span> Tel: </span> ${USER.tel} </p>
        <p> <span> Country: </span> ${USER.country} </p>
            
        
    </div>
    `

    // append user info

    grid.append(conntainer)


    // current Level and xp

    const level = await profileAPI(querys.level)
    const xp = await profileAPI(querys.xp)

    const LEVEL = level.transaction[0].amount
    const XP = xp.transaction_aggregate.aggregate.sum.amount

    const MXP = xpCount(XP)

    const stat = document.createElement("div")
    const statLevel = document.createElement("div")
    const statXP = document.createElement("div")
    stat.setAttribute("class", "stat-lx")
    statLevel.setAttribute("class", "stat-level")
    statXP.setAttribute("class", "stat-xp")

    statLevel.innerHTML = `
      <div class="stat">
            
      <div class="level"> 
        <p>  Current Level  </p>
            <div class="level-circle"> ${LEVEL} </div>
      </div>
        
    </div>
    `

    statXP.innerHTML = `
      <div class="stat">
            
      <div class="xp"> 
      <p>  Total XP  </p>
            <div class="xp-circle"> ${MXP} </div>
      </div>
        
    </div>
    `

    stat.append(statLevel, statXP)
    grid.append(stat)



    // skill Levels 

    const skillLevels = await getSkillLevels()

    const skillContainer = document.createElement("div")
    skillContainer.setAttribute("class", "skill-container")

    const objSkill = Object.entries(skillLevels[0])

    const divSkill = document.createElement("div")
    divSkill.setAttribute("class", "div-skill")

    objSkill.forEach(skill => {


        const type = document.createElement("p")
        type.style.color = "white"
        const amount = document.createElement("p")
        type.textContent = skill[0].split("_")[1]
        amount.textContent = `${skill[1]}%`

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        svg.setAttribute('width', '25')
        svg.setAttribute('height', `400`)
        svg.style.backgroundColor = "white"
        svg.style.borderRadius = "15px"

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        rect.setAttribute('width', `25`)
        rect.setAttribute('height', `${skill[1]}%`)
        rect.setAttribute('fill', 'blue')

        svg.appendChild(rect)


        const skillBar = document.createElement("div")
        skillBar.setAttribute("class", "skill-bar")

        skillBar.append(amount, svg, type)

        divSkill.appendChild(skillBar)

        skillContainer.appendChild(divSkill)
    })


    // finish project 

    const project = await finishProject()

    // audits 

    const audit = await profileAPI(querys.audit)

    const failed = audit.user[0].failed.length
    const succeeded = audit.user[0].succeeded.length

    const auditCount = succeeded + failed


    const auditContainer = document.createElement("div")
    auditContainer.setAttribute("class", "audit-container")
    auditContainer.innerHTML = `
    <h1> Audit Failed-Succeeded </h1>
    `

    const FS = document.createElement("div")
    FS.setAttribute("class", "fs")

    // failed

    const svgHeight = 200
    const fHeight = svgHeight * (failed / 100)
    const svgF = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgF.setAttribute('width', '80');
    svgF.setAttribute('height', `${svgHeight}`)

    const rectF = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rectF.setAttribute('width', '80');
    rectF.setAttribute('height', `${fHeight}`)
    rectF.setAttribute('y', `${svgHeight - fHeight}`)
    rectF.setAttribute('fill', 'red');

    svgF.appendChild(rectF);

    // succeeded

    const sHeight = svgHeight * (succeeded / 100)
    const svgS = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svgS.setAttribute('width', '80')
    svgS.setAttribute('height', `${svgHeight}`)

    const rectS = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    rectS.setAttribute('width', '80')
    rectS.setAttribute('height', `${sHeight}`)
    rectS.setAttribute('y', `${svgHeight - sHeight}`)
    rectS.setAttribute('fill', 'green')

    svgS.appendChild(rectS)

    FS.append(svgS, svgF)

   


    const div = document.createElement("div")
    div.setAttribute("class", "div-audit")

    div.innerHTML = `
    <div class="t-audit"> ${auditCount} Total Audits </div>
    <div class="audit-fs" >
        <div class="audit-circle-s"> ${succeeded} </div>
        <p class="s"> Succeeded ${((succeeded * 100) / auditCount).toFixed(1) }% </p>
    </div>
     <div class="audit-fs" >
        <div class="audit-circle-f"> ${failed} </div>
        <p class="f"> Failed ${((failed * 100) / auditCount).toFixed(1) }% </p>
    </div>
    `

     auditContainer.append(FS, div)


     const graphsection = document.createElement("div")

     graphsection.setAttribute("class", "graph-section")

    graphsection.innerHTML = `
        <h1 class="section"> Graph Section </h1>
    `

    graphsection.append(skillContainer, auditContainer)


    document.body.append(grid, project, graphsection)
    // log out 

    const log_out = document.querySelector(".log-out")
    log_out.addEventListener("click", () => {
        localStorage.removeItem("JWT")
        showLogin()
    })
}





export function showLogin() {
    document.body.innerHTML = `
    <div class="log-container">
        <div class="info-side">
            <h2>Welcome !</h2>
            <p>Log in to access your account</p>
        </div>
        <div class="login-form">
            <h1>Login</h1>
            <form id="login-form" method="post">
                <div class="form-group">
                    <label for="username">Nickname / Email</label>
                    <input type="text" id="username" name="email" placeholder="Nickname ola Email">
                </div>
                <div class="form-group">
                    <label for="password">Mot de passe</label>
                    <input type="password" id="password" name="password" placeholder="password ..." required>
                </div>
                <p id="error-log"></p>
                <button type="submit" id="login-btn">Login</button>
            </form>
            
        </div>
    </div>
    </div>
    `

    loginAPI()
}