'use client'
import { signOut, useSession } from "next-auth/react"

const page = () => {
    const {data: session} = useSession();
    if(session){
        return (
        <>
            Signed in as {sessionStorage.user.email}<br/>
            <button onClick={()=>signOut()}>Sign out </button>
        </>
        )
    }
    return(
        <>
            <p>In Sign In Page</p>
            <button>Sign In</button>
        </>
    )
}

export default page
