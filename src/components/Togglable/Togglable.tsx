import { useState } from "react"

interface TogglableProps {
  buttonLabel: string;
  children: JSX.Element | JSX.Element[];
}

const Togglable = forwardRef((props: TogglableProps, refs) => {
  const [visible, setVisible] = useState(false)

  // const hideWhenVisible = { display: visible ? 'none' : ''};
  // const showWhenVisible = { display: visible ? '' : 'none'};

  const toggleVisibility = () => setVisible(!visible);

  // return (
  //   <div>
  //     <div style={hideWhenVisible}>
  //       <button onClick={toggleVisibility}>{props.buttonLabel}</button>
  //     </div>
  //     <div style={showWhenVisible}>
  //       {props.children}
  //       <button onClick={toggleVisibility}>cancel</button>
  //     </div>
  //   </div>
  // )

  return (
    <div>
      { !visible && 
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      }
      { visible && 
        <div>
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      } 
    </div>
  )
}
export default Togglable