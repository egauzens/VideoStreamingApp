import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderEditDeleteButtons(stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="d-flex justify-content-right">
                    <Link to={`/streams/edit/${stream.id}`} className="float-right btn btn-outline-warning ml-1">
                        Edit
                    </Link>
                    <Link to={`/streams/delete/${stream.id}`} className="float-right btn btn-outline-danger ml-1">
                        Delete
                    </Link>
                </div>
            );
        }
    }

    renderList() {
        return this.props.streams.map(stream => {
            return (
                <div className="list-group-item" key={stream.id}>
                    <div className="d-flex align-items-center">
                        <div className="d-flex justify-content-left align-items-center w-100">
                            <i className="fas fa-camera fa-3x"></i>
                            <div className="ml-3">
                                <Link to={`/streams/${stream.id}`} className="m-0 font-weight-bold">{stream.title}</Link>
                                <p className="m-0">{stream.description}</p>
                            </div>
                        </div>
                        {this.renderEditDeleteButtons(stream)}
                    </div>
                </div>
            )
        })
    }

    renderCreateButton() {
        if (this.props.isSignedIn) {
            return (
                <div className="text-right">
                    <Link to="/streams/new" className="m-3 btn btn-outline-success">
                        Create Stream
                    </Link>
                </div>
            ); 
        }
    }

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="list-group list-group-flush">
                    {this.renderList()}
                </div>
                {this.renderCreateButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(
    mapStateToProps, 
    { fetchStreams }
)(StreamList);