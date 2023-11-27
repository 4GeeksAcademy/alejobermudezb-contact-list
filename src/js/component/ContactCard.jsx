import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../store/appContext'
import "../../styles/ContactCard.css"

const ContactCard = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate(); 

    const [mouseHoverDelete, setMouseHoverDelete] = useState(false);
    const [mouseHoverEdit, setMouseHoverEdit] = useState(false);

    const handlerMouseHoverDelete = (index) => {
        setMouseHoverDelete({ ...mouseHoverDelete, [index]: true });
    }

    const handlerMouseLeaveDelete = (index) => {
        setMouseHoverDelete({ ...mouseHoverDelete, [index]: false });
    }

    const handlerMouseHoverEdit = (index) => {
        setMouseHoverEdit({ ...mouseHoverEdit, [index]: true });
    }

    const handlerMouseLeaveEdit = (index) => {
        setMouseHoverEdit({ ...mouseHoverEdit, [index]: false });
    }

    const handlerDelete = async (id) => {
        try {
            const updatedList = store.contact.filter((contact) => contact.id !== id);

            store.contact = updatedList;

            await actions.deleteContact(id);


        } catch (error) {
            console.error("Ocurrio un error al borrar el contacto", error)
        }
    }

        const handlerEdit = async (contact) => {
            try {
                navigate("/CallUpdateContact", {state: {contact}})
    
    
            } catch (error) {
                console.error("Ocurrio un error al borrar el contacto", error)
            }



    }

    useEffect(() => {
        const getAgenda = async () => {
            try {

                await actions.getContactList()

            }

            catch (error) {
                console.log("Ocurrio un error", error)
            }
        }
        getAgenda();
    })




    return (
        <div className='Container-fluid'>

            <h1>Contact list</h1>
            <header>

                <div className='createNew'>

                    <Link to="/CallAddNewContact">
                        <button type="button" className="btn btn-success">Add new contact</button>
                    </Link>

                </div>

            </header>

            {store.contact.map((item, index) => (
                <div key={index} className=' contactList'>


                    <div className="card mb-3 container contact-card" >

                        <div className="row g-0">

                            <div className="col-md-3 imgBox">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Google_Contacts_logo.png" alt="Profile" />
                            </div>

                            <div className="col-md-7 infoBox">
                                <div className="card-body">
                                    <h5 className="card-title">{item.full_name}</h5>
                                    <div className='item i1'>
                                        <i className="fa fa-location-dot"></i>

                                        {item.address}

                                    </div>

                                    <div className='item i2'>
                                        <i className="fa fa-phone"></i>

                                        {item.phone}

                                    </div>

                                    <div className='item i3'>
                                        <i className="fa fa-envelope"></i>
                                        {item.email}
                                    </div>

                                </div>
                            </div>

                            <div className='col-md-2 icons d-flex'>
                                <button onClick={() => handlerDelete(item.id)} className='element' onMouseOver={() => handlerMouseHoverDelete(index)} onMouseLeave={() => handlerMouseLeaveDelete(index)}>
                                    <i className={mouseHoverDelete[index] ? "fa fa-trash fa-bounce" : "fa fa-trash"}></i>
                                </button>

                                <button onClick={() => handlerEdit(item, item.id)} className='element' onMouseOver={() => handlerMouseHoverEdit(index)} onMouseLeave={() => handlerMouseLeaveEdit(index)}>
                                    <i className={mouseHoverEdit[index] ? "fa fa-pen fa-bounce" : "fa fa-pen"}></i>
                                </button>
                            </div>


                        </div>
                    </div>


                </div>

            ))
            }


        </div >
    )

}

export default ContactCard