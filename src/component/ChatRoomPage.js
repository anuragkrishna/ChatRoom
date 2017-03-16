import React from 'react';
import ChatList from './ChatList';
import ChatForm from './ChatForm';
import ChatRoomHeader from './ChatRoomHeader';
const io = require('socket.io-client');
const socket = io();

class ChatRoomPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            message: "",
        };
        this.sendMessage = this.sendMessage.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        socket.on('message', (payload) => {
            this.addMessage(payload);
        });
    }

    addMessage(payload) {
        let newState = this.state;
        newState.messages.push(payload);
        this.setState(newState);
    }

    sendMessage(e) {
        e.preventDefault();
        if (this.state.message !== "") {
            socket.emit('message', { text: this.state.message });
            this.setState({ message: "" });
        }
    }

    onChange(e) {
        this.setState({ message: e.target.value });
    }

    render() {
        return (
            <div className="container">
                <div className="row header_chatroom">
                    <ChatRoomHeader/>  
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <ChatList messages={this.state.messages}/>
                        <ChatForm message={this.state.message} onChange={this.onChange} sendMessage={this.sendMessage}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatRoomPage;
