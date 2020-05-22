import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
    return ReactDOM.createPortal(
        <div 
            onClick={props.onDismiss} 
            className="modal" 
            style={{ display: 'block', backgroundColor: 'rgba(10,10,10,.5)'}} 
        >
            <div 
                onClick={(e) => e.stopPropagation()} 
                className="modal-dialog modal-dailog-centered" 
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-center">{props.title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {props.content}
                    </div>
                    <div className="modal-footer">
                        {props.footer}
                    </div>
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
}

export default Modal;