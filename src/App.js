import React from 'react'
import ListContacts from './Components/ListContacts.js'

class App extends React.Component{
    state={
        contacts:[
            {
                "id": "ryan",
                "name": "Ryan Florence",
                "email": "ryan@reacttraining.com",
                "avatarURL": "http://localhost:5001/ryan.jpg"    
            },
            {
                "id": "michael",
                "name": "Michael Jackson",
                "email": "michael@reacttraining.com",
                "avatarURL": "http://localhost:5001/michael.jpg"   
            },
            {
                "id": "tyler",
                "name": "Tyler McGinnis",
                "email": "tyler@reacttraining.com",
                "avatarURL": "http://localhost:5001/tyler.jpg"   
            }
        ]
    }

    onDelectContact=(contact)=>{
        this.setState((state)=>({
            contacts:state.contacts.filter((item)=>(item.id!==contact.id))
        }))
    }

    render(){
        return(
            <div>
                <ListContacts onDelectContact={this.onDelectContact} contactsList={this.state.contacts }/>
            </div>
        )
    }
}

export default App;