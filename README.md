Generated using Angular 12.

This.. is rather complex, because of course we're implementing a full fledged login and Auth Guard.

The table is pretty self-explanatory, but the login is a bit complicated, so I've written a basic overview here:

Login Flow:
1. If user tries to access any other page other than "Login" while not logged in, he'll be redirected to the login page. (app-routing.module.ts and src/app/network/auth-guard.guard.ts)
2. He gets redirected to the login page: src/app/components/pages/page-login/page-login.component.html
3. User signs in. 
3a. (Using the service src/app/services/authentication.service.ts, we create a mock post request, and save his username and token.)
3b. We also save the token into localstorage, so next time the user refreshes the page, he can skip the login screen. (See src/app/app.component.ts)
3c. At this point, using the interceptor (src/app/network/jwt.interceptor.ts), we start adding his TOKEN to all future requests he makes. 
4. After successfully logging in, he gets redirected to the page-table.





Next time he refreshes the page, in app.component.ts we check his localStorage, see he's already signed in, and redirect him immediately to the Table page.