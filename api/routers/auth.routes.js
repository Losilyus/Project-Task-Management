import { RegisterPost, Verify, LoginPost, RetryVerifyCode, ForgotPassword, ForgotPasswordChange, ProfileGet } from '../controllers/auth/index';
import { Auth } from '../middlewares';

export default [
    {
        method: 'POST',
        url: '/api/auth/register',
        handler: RegisterPost
    },
    {
        method: 'POST',
        url: '/api/auth/verify',
        handler: Verify
    },
    {
        method: 'POST',
        url: '/api/auth/login',
        handler: LoginPost
    },
    {
        method: 'GET',
        url: '/api/auth/retry_verify_code',
        handler: RetryVerifyCode
    },
    {
        method: 'POST',
        url: '/api/auth/forgot',
        handler: ForgotPassword
    },
    {
        method: 'POST',
        url: '/api/auth/forgot_change',
        handler: ForgotPasswordChange
    },
    {
        method: 'GET',
        url: '/api/auth/profile',
        preValidation: Auth,
        handler: ProfileGet,
    }
]
