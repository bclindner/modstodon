import { connect } from 'react-redux'
import InstanceURLDialog from '../components/InstanceURLDialog'
import { registerApp } from "../actions/auth"

const mapDispatchToProps = dispatch => ({
    registerApp: instanceURL => dispatch(registerApp(instanceURL))
})

export default connect(null, mapDispatchToProps)(InstanceURLDialog)