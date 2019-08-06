import { connect } from 'react-redux'
import OAuthAuthorize from "../components/OAuthAuthorize"
import { handleAuthCode } from "../actions/auth"

const mapStateToProps = state => ({
    client_id: state.auth.client_id,
    instanceURL: state.auth.instanceURL
})

const mapDispatchToProps = dispatch => ({
    handleAuthCode: code => dispatch(handleAuthCode(code))
})

export default connect(mapStateToProps, mapDispatchToProps)(OAuthAuthorize)