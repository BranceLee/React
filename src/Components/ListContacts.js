import React from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends React.Component{
     static PropType={
        contact:PropTypes.array.isRequired,
        onDelectContact:PropTypes.func.isRequired
    }

    state={
        query:''
    }

    Query=(event)=>{
        this.setState({
            query:event.target.value.trim()
        })
    }

    showAll=()=>{
        this.setState({
            query:''
        })
    }

    render(){
        const {contactsList,onDelectContact}=this.props
        const {query}=this.state
        let showingContacts
        if(query){
            const match=new RegExp(escapeRegExp(query),'i')//查询字段中有特殊字符直接跳过
            showingContacts=contactsList.filter((contact)=>match.test(contact.name))
        }else{
            showingContacts=contactsList
        }
        
        showingContacts.sort(sortBy('name'))

        return(
        <div className='list-contacts'>
            <div className='search-contacts-top'>
             <input className='search-contacts' 
                    type='text'
                    placeholder='Search contacts'
                    value={query}
                    onChange={this.Query}
                    />
            </div>{
                query===''? null :(
                    <div className='showing-contacts'>
                        <span>{`Now showing ${showingContacts.length} of ${contactsList.length} total `}
                            {/* <a href='' onClick={this.showAll}>Show all</a> */}
                            <button  onClick={this.showAll}>show all</button>
                        </span>
                    </div>
                )
            }
            <div>
                <ol className="contact-list">{
                    showingContacts.map((contact)=>{
                        return(
                            <li key={contact.id} className="contact-list-item">
                                <div className="contact-avatar" style={{
                                    backgroundImage:`url(${contact.avatarURL})`
                                }}></div>
                                <div className='contact-details'>
                                    <span>{contact.name}</span>
                                    <span>{contact.email}</span>
                                </div>
                                <button onClick={()=>(onDelectContact(contact))} className='contact-remove'>Remove</button>
                            </li>
                        )
                    })
                }
                </ol>
            </div>
            
        </div>
        )
    }
}



export default ListContacts