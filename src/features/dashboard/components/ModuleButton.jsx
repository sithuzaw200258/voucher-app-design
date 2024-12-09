import React from 'react'
import { Link } from 'react-router-dom';

const ModuleButton = ({ name, icon, url }) => {
    return (
        <div>
            <Link to={url}>
                <div className="bg-blue-600 text-white flex flex-col justify-center items-center gap-y-2 p-5 rounded-lg">
                    {icon}
                    {name}
                </div>
            </Link>
        </div>
    )
}

export default ModuleButton;