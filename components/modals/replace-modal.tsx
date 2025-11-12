'use client'

import React, {useState} from 'react'
import {Modal} from '../modal'
import {Button} from '@/components/ui/button'
import {FaExchangeAlt} from "react-icons/fa";
import {MdSearch} from "react-icons/md";

export const ReplaceModal = () => {
    const [modal, setModal] = useState<boolean>(false)

    const closeModal = () => setModal(false)
    const openModal = () => setModal(true)

    return <>
        <Button
            onClick={openModal}
            size={'xs'}
            className=" bg-blue-500/90 hover:bg-blue-700" id="tour-cta-replace"
        >
            <MdSearch/>
            <FaExchangeAlt/>
            კომ.ჩანაცვლება
        </Button>

        <Modal open={modal} onCloseAction={closeModal}>
            <div>modal</div>
        </Modal>
    </>
}