import { showLogin, showProfile } from "./pages.js";

export const API = {
    data: 'https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql',
    signin: 'https://learn.zone01oujda.ma/api/auth/signin'
}


export async function loginAPI() {
    const form = document.getElementById("login-form");

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = form.username.value
        const password = form.password.value

        try {
            const encoded = btoa(`${username}:${password}`)

            const response = await fetch(API.signin, {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${encoded}`
                }
            });

            const token = await response.json()

            if (token.error) throw token.error

            localStorage.setItem("JWT", token)

            showProfile()

        } catch (error) {
            showError(error)
        }
    })
}


export function showError(err) {
    let e = document.getElementById("error-log")
    e.textContent = `Log-in Error : ${err}`
}




export async function profileAPI(query) {


    const token = localStorage.getItem("JWT")

    if (!token) showLogin()


    try {

        const response = await fetch(API.data, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ query })
        })

        const result = await response.json()

          if (result.errors) {
            console.log(result.errors);
            
            throw result.errors
          }
        
        return result.data

    } catch (error) {

        if (error[0].message === 'Could not verify JWT: JWTExpired') {
            localStorage.removeItem("JWT")
        }

        console.error("JWT Error", error || "Login failed. Please try again.");
        showLogin()
        return
    }




}