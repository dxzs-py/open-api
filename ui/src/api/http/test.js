import {get} from '../config'

// Mock
export default {
    GetDashboard: (params, config) => get('/login_info', params, config)
}
