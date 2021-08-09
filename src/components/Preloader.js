import React from 'react';

const Preloader = (props) => {

    const preloaderClass = `preloader ${props.loading ? "preloader_visible" : ""}`

    return (
        <div className={preloaderClass}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader
