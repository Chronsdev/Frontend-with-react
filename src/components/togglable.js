import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const hiddenWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisiblity = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisiblity
		}
	})

	return(
		<div>
		  <div style={hiddenWhenVisible}>
		  	<button onClick={toggleVisiblity}>{props.buttonLabel}</button>
		  </div>
		  <div style={showWhenVisible}>
		  	{props.children}
		  	<button onClick={toggleVisiblity}>Cancel</button>
		  </div>			 
		</div>
		)
})
	


export default Togglable