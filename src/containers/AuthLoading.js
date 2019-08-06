import { connect } from 'react-redux'
import AuthLoading from "../components/AuthLoading"

export const mapStateToProps = state => ({
    loggedIn: state.auth.instanceURL && state.auth.accessToken ? true : false,
    loading: state.auth.loading
})

export default connect(mapStateToProps)(AuthLoading)