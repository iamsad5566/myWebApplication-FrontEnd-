import React, { useState } from 'react';
import NavBar from '../../nav/nav';
import HeaderChatRoom from '../headers/headerChatRoom';
import ChatRoomUI from './chatRoomUI';

const ChatRoom = () => {

    const [nickname, setNickname] = useState("");
    const [done, setDone] = useState(false);

    const styleForChatRoom = {
        height:"100vh",
        margin:"auto",
        display:"flex", 
        alignItems:"center", 
        justifyContent:"center"
    }

    function handleChange(event) {
        setNickname( event.target.value );
    }

    function handleClick(event) {
        event.preventDefault();
        if( nickname.length > 0 )
           setDone(true);
    }
    
    return ( 
        <div>
            <HeaderChatRoom/>
            <NavBar/>
            <div>
                {done?
                    <ChatRoomUI nickname={nickname}/>
                    :(<div style={styleForChatRoom}>
                        <div>
                            <h3 style={{textAlign:"center", margin:"1em"}}>請輸入暱稱：</h3>

                            <form className="input-group" style={{width:"20em"}}>
                                <input type="text" name="nickname" value={nickname} className="form-control" placeholder="Type your nickname" onChange={event => handleChange(event)} autoComplete="off"/>
                                <button className="btn btn-primary" type="submit" onClick={event => handleClick(event)}>Send</button>
                            </form>

                        </div>
                    </div>)
                }
            </div>
        </div>
     );
}
 
export default ChatRoom;