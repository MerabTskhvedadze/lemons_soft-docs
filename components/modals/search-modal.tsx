import React, {useState} from 'react'
import {Modal} from '../modal'
import {Button} from '@/components/ui/button'
import {MdSearch} from "react-icons/md";

export const SearchModal = () => {
    const [modal, setModal] = useState<boolean>(false)

    const closeModal = () => setModal(false)
    const openModal = () => setModal(true)

    return <>
        <Button
            onClick={openModal}
            size={'xs'}
            className=" bg-green-600 hover:bg-green-700" id="tour-cta-fullsearch">
            <MdSearch/>
            სრული ძებნა
        </Button>

        <Modal open={modal} onCloseAction={closeModal}>
            <div>modal</div>
        </Modal>
    </>
}