const BASE_URL="http://127.0.0.1:8000"
export async function sendMessage(message){
    const res=await fetch(`${BASE_URL}/chat`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            message:message
        })
    })
    return await res.json()

}

export async function uploadFile(file){
    const formdata=new FormData()

    formdata.append("file",file)

    const res=await fetch(`${BASE_URL}/upload-pdf`,{
        method:"POST",
        body:formdata
    })
    return await res.json();
}