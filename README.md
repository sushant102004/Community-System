## 🔥 The Internet Folks
This code is for the assignment for <b>SDE Job</b> at The Internet Folks.

This is a backend application that has an authentication and community system. Where users can create communities and add and remove other users from their communities. It has to have roles assigned for role-based access. Users can also view communities and much more.

### 🚀 Endpoints
<br>

| **Title**               | **Type** | **Endpoint**                            |
|-------------------------|----------|-----------------------------------------|
| SignUp                  | POST     | localhost:3000/v1/auth/signup           |
| Sign In                 | POST     | localhost:3000/v1/auth/signin           |
| My Profile              | GET      | localhost:3000/v1/me                    |
| Create Community        | POST     | localhost:3000/v1/community             |
| Get All Communities     | GET      | localhost:3000/v1/community             |
| Get Members (Community) | GET      | localhost:3000/v1/community/:id/members |
| Owned Communities       | GET      | localhost:3000/v1/community/me/owner    |
| Joined Communities      | GET      | localhost:3000/v1/community/me/member   |
| Add Member              | POST     | localhost:3000/v1/member/               |
| Delete Member           | DELETE   | localhost:3000/v1/member/:id            |
| Create Role             | POST     | localhost:3000/v1/role/                 |
| Get All Roles           | GET      | localhost:3000/v1/role/                 |
