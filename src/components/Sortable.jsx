import React from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2'

const Sortable = ({ children, handleSort, sortBy }) => {
    return (
        <>
            <div className="flex items-center gap-1">
                <span className="pr-3">{children}</span>
                <span className=" flex flex-col">
                    <button
                        className=" hover:bg-stone-300"
                        onClick={handleSort.bind(null, {
                            sort_by: sortBy,
                            sort_direction: "asc",
                        })}
                    >
                        <HiChevronUp />
                    </button>
                    <button
                        className=" hover:bg-stone-300"
                        onClick={handleSort.bind(null, {
                            sort_by: sortBy,
                            sort_direction: "desc",
                        })}
                    >
                        <HiChevronDown />
                    </button>
                </span>
            </div>
        </>
    )
}

export default Sortable