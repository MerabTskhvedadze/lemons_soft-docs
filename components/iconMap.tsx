import React from 'react'
import {
    FaHome, FaDesktop, FaBars, FaAddressBook, FaShoppingBag, FaHandshake, FaUsers,
    FaPhone, FaMobile, FaComments, FaBookmark, FaCreditCard, FaHourglassStart, FaMap,
    FaUniversity, FaBuilding, FaFile, FaArchive, FaLanguage, FaBook, FaCubes
} from "react-icons/fa";
import type { IconKey } from "@/types/menu";

const map: Record<IconKey, React.ReactNode> = {
    home: <FaHome/>, desktop: <FaDesktop/>, bars: <FaBars/>, addressBook: <FaAddressBook/>,
    shoppingBag: <FaShoppingBag/>, handshake: <FaHandshake/>, users: <FaUsers/>, phone: <FaPhone/>,
    mobile: <FaMobile/>, comments: <FaComments/>, bookmark: <FaBookmark/>, creditCard: <FaCreditCard/>,
    hourglass: <FaHourglassStart/>, map: <FaMap/>, university: <FaUniversity/>, building: <FaBuilding/>,
    file: <FaFile/>, archive: <FaArchive/>, language: <FaLanguage/>, book: <FaBook/>, cubes: <FaCubes/>,
};

export function iconFromKey(key: IconKey) { return map[key]; }
