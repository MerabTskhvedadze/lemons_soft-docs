'use client'

import React, {useState} from 'react'
import {Modal} from '../modal'
import {Button} from '@/components/ui/button'

export const FbStatisticModal = () => {
    const [modal, setModal] = useState<boolean>(false)

    const closeModal = () => setModal(false)
    const openModal = () => setModal(true)

    return <>
        <Button
            onClick={openModal}
            size={'xs'}
            id="tour-cta-filters"
            className={'bg-blue-700 hover:bg-blue-800'}
        >
            📊 FB სტატისტიკა
        </Button>

        <Modal open={modal} onCloseAction={closeModal}>
            <div>modal</div>
        </Modal>
    </>
}