import React from 'react'

export default function MainHeader() {
    return (
        <header className='header-banner'>
            <div className="overlay"></div>
            <div className="animated-texts overlay-content">
                <h1>
                    Welcome to <span className="hotel-color"> lakeSide Hotel</span>
                </h1>
                <h4>Experience the Best Hospitality in Town</h4>
            </div>
        </header>
    )
}
