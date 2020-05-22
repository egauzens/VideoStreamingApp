import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import { Link } from 'react-router-dom';

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderFooter() {
        const id = this.props.match.params.id;

        return (
            <div>
                <button onClick={() => this.props.deleteStream(id)} className="btn btn-danger">
                    Delete
                </button>
                <Link to="/" className="ml-2 btn btn-primary">
                    Cancel
                </Link>
            </div>
        );
    }

    renderContent() {
        return !this.props.stream ? 
            'Are you sure you want to delete this stream?' :
            `Are you sure you want to delete the stream with title: ${this.props.stream.title}`;
    }

    render() {
        return (
            <Modal 
                title="Delete Stream"
                content={this.renderContent()}
                footer={this.renderFooter()}
                onDismiss={() => history.push('/')}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);