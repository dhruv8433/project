import React from 'react'
import {NavLink} from 'react-router-dom'
import './Style.css'

const Navigation = () => {
  return (
    <div className='Navigation'>
        <ul>Blogs</ul>
        <nav>
            <NavLink to={'/'} style={({isActitve}) => ({
              color : isActitve ? "Red" : "white" })}>Home</NavLink>
  
            <NavLink to={'/about'} style={({isActitve}) => ({
              color : isActitve ? "Red" : "white" })}>About</NavLink>
 
            <NavLink to={'/blogs'} style={({isActitve}) => ({
              color : isActitve ? "Red" : "white" })}>Blogs</NavLink>
 
            <NavLink to={'/contact'} style={({isActitve}) => ({
              color : isActitve ? "Red" : "white" })}>Contact</NavLink>
              
        </nav>
    </div>
  )
}

export default Navigation