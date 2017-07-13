```
auth/
  phone
  username
  github.js

index.js

  //setupUsername(config, {login: true, signup: false, resetPassword: false})
  //setupPhone(config)
  //setupGithub(config)


# Password based login

  POST /login username password
  -> {token}
     404 Username or Password Error

# OAuth based login

  goto /auth/github
  redirect to /login-oauth-token?token=x
```
