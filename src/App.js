import React from 'react'
import {Route} from 'react-router-dom' //地址映射需要显示的组件
import ListContacts from './Components/ListContacts.js'
import * as ContactsAPI from './utils/ContactsAPI.js'
import AddContact from './Components/addContact.js';

class App extends React.Component{
    state={
        contacts:[],
    }

    onDelectContact=(contact)=>{
        this.setState((state)=>({
            contacts:state.contacts.filter((item)=>(item.id!==contact.id))
        }))
        ContactsAPI.remove(contact)
    }

    addContact=(contact)=>(
        ContactsAPI.create(contact).then(contact=>{
            this.setState(state=>({                      //添加后自动刷新的效果
                contacts:state.contacts.concat([contact])
            }))
        })
    )
    componentDidMount(){ 
        ContactsAPI.getAll().then((contacts)=>(
            this.setState({
                contacts:contacts  //可简写contacts
            })
        ))
    }

    render(){
        return(
            <div>
                <Route exact path='/' render={()=>(<ListContacts 
                    onDelectContact={this.onDelectContact} 
                    contactsList={this.state.contacts}/>)}
                />
                <Route exact path='/create' render={({history})=>(
                    <AddContact addContact={(contact)=>{
                        this.addContact(contact)
                        history.push('/')
                     }}/> 
                 )}
                />
            </div>
        )
    }
}

export default App;