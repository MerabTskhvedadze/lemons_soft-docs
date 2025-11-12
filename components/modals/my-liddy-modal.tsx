'use client'
import React, {useState} from "react";
import {FaUserClock} from "react-icons/fa";
import {Button} from "@/components/ui/button";
import {Modal} from '../modal'

export const MyLiddyModal = () => {
    const [modal, setModal] = useState<boolean>(false)

    const closeModal = () => setModal(false)
    const openModal = () => setModal(true)

    return <>
        <Button
            onClick={openModal}
            size={'xs'}
            className=" bg-blue-500/90 hover:bg-blue-700" id="tour-cta-myLeads">
            <FaUserClock/>
            ჩემი ლიდები
        </Button>

        <Modal open={modal} onCloseAction={closeModal}>
            <div>modal</div>
        </Modal>
    </>
}