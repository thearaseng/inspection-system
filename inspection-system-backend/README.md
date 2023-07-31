### Retrieving users

Users a retrieved thanks to the `UserService`. This class extends `UserDetailsService` that is a Spring Security class, and implements the `loadUserByUsername()` method. Spring will automatically uses this method to retrieve users from database.

### Passwords hashing

The passwords stored in the database are hashed thanks to a BCrypt algorithm using a cost of 10. The `OAuth2AuthorizationConfig.passwordEncoder()`method configures spring to use this algorithm automatically to compare the password received by the `/oauth` endpoints with the password in database.

# Testing the application

The users defined in the `import.sql` file are automatically inserted in the database when Spring Boot starts. We will use the user 'user' with a password 'password' (encrypted in the database with BCrypt).

## Step 1 : Get a JWT access token

Use the `/oauth/token` endpoint. Note that the provided user password is not encrypted. Spring will automatically hash the password with a BCrypt algorithm and compare it with the entry in the database.
```sh
$ curl myClient:myClientSecret@localhost:8080/oauth/token -d grant_type=password -d username=user -d password=password
```

The **myClient:myClientSecret** is your OAuth2 client API key, provided as Basic HTTP headers.

Result :
```json
{"access_token":"abcdefg","token_type":"bearer","refresh_token":"abcdefg","expires_in":43199,"scope":"openid","jti":"88821280-ac82-4066-af0c-e7a602f1bce6"}                                                                                          
```

The access_token is your jwt token. It contains your user informations.

## Step 2 : Use the JWT token to access secured endpoints

Use this access token in an **Authorization** header to query a secured endpoint. Note that you do not need to provide the client OAuth2 API key anymore (**myClient:myClientSecret**).
```sh
$ curl -H "Authorization: Bearer abcdefg" localhost:8080/
```

Result :
```
Hello World
```

That's all !
