import React, {useState} from 'react'
import {Modal} from '../modal'
import {Button} from '@/components/ui/button'
import {MdDashboard} from "react-icons/md";

export const MoveModal = () => {
    const [modal, setModal] = useState<boolean>(false)

    const closeModal = () => setModal(false)
    const openModal = () => setModal(true)

    return <>
        <Button
            onClick={openModal}
            size={'xs'}
            className=" bg-blue-500/90 hover:bg-blue-700" id="tour-cta-move"
        >
            <MdDashboard/>
            გადატანა
        </Button>
        
        <Modal open={modal} onCloseAction={closeModal}>
            <div>modal</div>
        </Modal>
    </>
}