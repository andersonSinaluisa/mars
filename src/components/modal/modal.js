import React from 'react';

class Modal extends React.Component{


    click(){

        document.getElementById('id01').style.display='none'
    }
    componentDidMount(){
        document.getElementById('id01').style.display='block'

    }
    render() {
        return (
            <div id="id01" class="w3-modal">
            <div class="w3-modal-content">
              <div class="w3-container">
                <span onClick={this.click()}>&times;</span>
                <p>hey</p>
                <p>hey</p>
              </div>
            </div>
          </div>
        
        );
    }
}

export default Modal;