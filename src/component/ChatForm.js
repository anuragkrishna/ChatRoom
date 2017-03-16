import React from 'react';

export default (props) => {
    return (
        <div id="chat_form form-horizontal" action={props.sendMessage}>
    		<div className="input-group">
      			<input type="text" autoComplete="off" className="form-control" value={props.message} onChange={props.onChange} placeholder="Write something"/>
      			<span className="btn btn-primary input-group-addon" onClick={props.sendMessage}>Send</span>
    		</div>
  		</div>
    );
}
