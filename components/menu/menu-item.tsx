import {MdEdit, MdDelete} from "react-icons/md";

export function MenuItem() {
    return (
        <div className={' p-2 border hover:border-gray-400 rounded-md'}>
            <div className={'select-none cursor-grab group p-2 flex items-center gap-3 justify-between '}>
                <div>
                    <h1 className={'font-semibold text-md text-gray-700 group-hover:text-gray-400'}>ნომრების ბაზა</h1>
                    <p className={`text-[11px] font-semibold text-gray-700 group-hover:text-gray-400`}>Key:
                        numbers_base</p>
                </div>

                <div className={'text-gray-600 flex items-center gap-2'}>
                    <MdEdit size={24} className={'cursor-pointer group-hover:text-gray-400'}/>
                    <MdDelete size={24} className={'cursor-pointer group-hover:text-gray-400'}/>
                </div>
            </div>

            <div className={'pl-10 '}>
                <div
                    className={'select-none cursor-grab group p-2 flex items-center gap-3 justify-between border hover:border-gray-400 rounded-md'}>
                    <div>
                        <h1 className={'font-semibold text-md text-gray-700 group-hover:text-gray-400'}>ნომრების
                            ბაზა</h1>
                        <p className={`text-[11px] font-semibold text-gray-700 group-hover:text-gray-400`}>Key:
                            numbers_base</p>
                    </div>

                    <div className={'text-gray-600 flex items-center gap-2'}>
                        <MdEdit size={24} className={'cursor-pointer group-hover:text-gray-400'}/>
                        <MdDelete size={24} className={'cursor-pointer group-hover:text-gray-400'}/>
                    </div>
                </div>
            </div>
        </div>
    )
}