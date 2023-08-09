import React from 'react'
import {NavLink} from 'react-router-dom'
import './Style.css'

const Navigation = () => {
    return (
        <div>
            <div className="divnav">
                <ul>Logo</ul>
                <nav>
                    <ul>
                        <NavLink to='/' style={({isActive})=>({
                            color: isActive ? 'Blue' : 'white'
                        })}>Home</NavLink>

                        <NavLink to='/about' style={({isActive})=>({
                            color: isActive ? 'Blue' : 'white'
                        })}>About</NavLink>

                        <NavLink to='/blogs' style={({isActive})=>({
                            color: isActive ? 'Blue' : 'white'
                        })}>Blogs</NavLink>

                        <NavLink to='/contact' style={({isActive})=>({
                            color: isActive ? 'Blue' : 'white'
                        })}>Contact</NavLink>

                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navigation