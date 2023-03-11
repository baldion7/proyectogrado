export const AdminView=(req,res)=>{
    res.render('pages/admin-page', { title: 'Mi aplicación Node.js' });
}
export const UserView=(req,res)=>{
    res.render('pages/user', { title: 'Mi aplicación Node.js' });
}
export const RegisterView=(req,res)=>{
    res.render('pages/register', { title: 'Mi aplicación Node.js' });
}
export const LoginView=(req,res)=>{
    res.render('pages/login', { title: 'Mi aplicación Node.js' });
}
export const ErrorView=(req,res)=>{
    res.render('pages/error', { title: 'Mi aplicación Node.js' });
}
export const ResetPasswordView=(req,res)=>{
    res.render('pages/forgot-password');
}
