import "../Loading.css"
const Loading = (loading) => {
    return(
        <div className={'loading ' + loading.loading}>
            <div className="lds-default">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <p>Loading</p>
        </div>
    )
}

export default Loading