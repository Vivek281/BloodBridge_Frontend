import NotFound from "../../components/errors/NotFound";

export default function ErrorPage({code}: Readonly<{code:number}>) {
    return(
        <>

           {(code === 404) ? <NotFound/> : ( (code === 500)? <>Server Error</> : <>Other Error</>)}

        </>
    );
}