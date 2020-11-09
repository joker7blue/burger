import React, {Component} from 'react';
import Auxx from '../Auxx';
import Modal from '../../components/UI/Modal/Modal';


const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {

        state = {

            error: null
        }

        constructor(props) {
            super(props);

            this.requestInterceptor = axios.interceptors.request.use(req => {

                this.setState({error: null});
                return req;
            });

            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {

                this.setState({error: error});
                return Promise.reject(error);
            });

            console.log('[withErrorHandler] Constructor', this.requestInterceptor, this.responseInterceptor);
        }


        _errorConfirmedHandler = () => {

            this.setState({error: null});
        }
        

        componentWillUnmount() {
            
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);

            console.log('[withErrorHandler] componentWillUnmount', this.requestInterceptor, this.responseInterceptor);
        }
        

        render() {
            return (
                <Auxx>
                    <Modal show={this.state.error} modalClose={this._errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Auxx>
            );
        }
        
    }
}

export default withErrorHandler;