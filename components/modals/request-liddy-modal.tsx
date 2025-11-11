import React, {useState} from "react";
import {FaPhone} from "react-icons/fa";
import {Button} from "@/components/ui/button";
import {Modal} from '../modal'

export const RequestLiddyModal = () => {
    const [modal, setModal] = useState<boolean>(false)

    const closeModal = () => setModal(false)
    const openModal = () => setModal(true)

    return <>
        <Button
            onClick={openModal}
            size={'xs'}
            className=" bg-yellow-600 hover:bg-yellow-700" id="tour-cta-requestLead"
        >
            <FaPhone/>
            ლიდის მოთხოვნა
        </Button>

        <Modal open={modal} onCloseAction={closeModal}>
            <div>modal</div>
        </Modal>
    </>
}