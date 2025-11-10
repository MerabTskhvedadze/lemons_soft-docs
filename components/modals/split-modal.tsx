import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {Modal} from '../modal'
import {MdGroups} from "react-icons/md";

export const SplitModal = () => {
    const [modal, setModal] = useState<boolean>(false)

    const closeModal = () => setModal(false)
    const openModal = () => setModal(true)

    return <>
        <Button
            onClick={openModal}
            size={'xs'}
            className=" bg-blue-700 hover:bg-blue-800" id="tour-cta-distribute"
        >
            <MdGroups/>
            განაწილება
        </Button>

        <Modal open={modal} onCloseAction={closeModal}>
            <div>modal</div>
        </Modal>
    </>
}