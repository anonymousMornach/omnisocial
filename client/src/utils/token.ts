import Cookies from "universal-cookie";
const cookies = new Cookies();
export async function getToken(){
    return cookies.get("TOKEN");
}

export async function setToken(token:any) {
    cookies.set("TOKEN", token, {
        path: "/",
    });
}

export async function deleteToken() {
    cookies.remove("TOKEN", { path: "/" })
}