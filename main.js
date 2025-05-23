import { showLogin, showProfile } from "./scripts/pages.js"


addEventListener("DOMContentLoaded", () => {

    

    let token = localStorage.getItem("JWT")

    !token ? showLogin() : showProfile()
})



