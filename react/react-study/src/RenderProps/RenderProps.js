
import React from 'react';
import catpng from '../cat.png';

class Cat extends React.Component {
    render() {
      const mouse = this.props.mouse;
      return (
        <img src={catpng} alt="xx" style={{ position: 'fixed', width: '100px', left: mouse.x, top: mouse.y }} />
      );
    }
  }
  
  class Mouse extends React.Component {
    constructor(props) {
      super(props);
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.state = { x: 0, y: 0 };
    }
  
    handleMouseMove(event) {


      this.setState({
        x: event.clientX,
        y: event.clientY
      });
    }
    
    handleMouseDown = (e) => {
      var diffY = e.clientY - e.target.offsetTop;
      var diffX = e.clientX - e.target.offsetLeft;
      console.log(e, diffX, diffY);
      document.onmousemove = (ev) => {
        var left = ev.clientX - diffX;
        var top = ev.clientY - diffY;
        this.setState({
          x: left,
          y: top
        });
      }
      document.onmouseup = (ev) => {
        document.onmousemove = null;
        document.onmouseup = null;
      }
    }
    render() {
      return (
        <div 
          style={{ height: '500px', width: '500px', position: 'relative', backgroundColor: '#b1eab1' }} 
          // onMouseMove={this.handleMouseMove}
          onMouseDown={this.handleMouseDown}>
          {/*
            Instead of providing a static representation of what <Mouse> renders,
            use the `render` prop to dynamically determine what to render.
          */}

          {this.props.render(this.state)}


          {/* children render 方式 */}
          {/* {this.props.children(this.state)} */}
        </div>
      );
    }
  }
  
  class MouseTracker extends React.Component {
    render() {
      return (
        <div>
          <h1>Move the mouse around!</h1>

          {/* render Props 模式 */}
          <Mouse render={mouse => (
            <Cat mouse={mouse} />
          )} />


          {/* children 模式 */}

          {/* <Mouse children={mouse => (
            <p>The mouse position is {mouse.x}, {mouse.y}</p>
          )}/> */}
          {/* <Mouse>
            {mouse => (
              <p>The mouse position is {mouse.x}, {mouse.y}</p>
            )}
          </Mouse> */}
        </div>
      );
    }
  }
  
export default MouseTracker;



/** render props HOC */
// If you really want a HOC for some reason, you can easily
// create one using a regular component with a render prop!

/*
function withMouse(Component) {
  return class extends React.Component {
    render() { 
      return (
        <Mouse render={mouse=> (
          <Component {...this.props} mouse={mouse} />
        )}/>
      );
    }
  }
}
*/
// export default withMouse(Cat);


/**
 * children props
 */
