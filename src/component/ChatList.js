import React from 'react';
import classnames from 'classnames';

export default (props) => {
    return (
        <div>
			<ul className="chat_list">
				{props.messages.map(message => {

					return (<p className={classnames("borderless",message.type)}>
								{message.user!==""? <span id="user_name">{message.user}: </span> : ""}
								<span id="message_text">{message.text}</span>
				  		   </p>);
				})}	
			</ul>	
        </div>
    );
}
