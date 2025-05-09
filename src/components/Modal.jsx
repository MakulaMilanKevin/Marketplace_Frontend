const Modal = ({ userInfo, id }) => {


    return (
        <dialog id={`modal-${id}`} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                {
                    userInfo &&
                        <>
                            <h3 className="font-bold text-lg">{userInfo.username} töltötte fel.</h3>
                            <p className="py-4">Email: {userInfo.email}</p>
                        </>
                }
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Bezárás</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default Modal