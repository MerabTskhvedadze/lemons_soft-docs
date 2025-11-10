import React, {useState} from 'react'
import {Modal} from '../modal'
import {Button} from '@/components/ui/button'
import {FaSlidersH} from "react-icons/fa";

export const AnalyzesModal = () => {
    const [modal, setModal] = useState<boolean>(false)

    const closeModal = () => setModal(false)
    const openModal = () => setModal(true)

    return <>
        <Button
            onClick={openModal}
            size={'xs'}
            variant={'destructive'} id="tour-cta-filters">
            <FaSlidersH/>
        </Button>

        <Modal open={modal} onCloseAction={closeModal}>
            <div>modal</div>
        </Modal>
    </>
}