
# [link deploy](https://rcg-airbnn-backend.onrender.com)

# Phats de mi usuario a traves de mi aplicacion

[✔] registrar mi usuario
[✔] loggear mi usuario

### Usuario sin sesion iniciada

1. Ver los lugares
2. puede ver la informacion de un lugar 


### Guest

1. Ver los lugares
2. puede ver la informacion de un lugar
3. reservar
4. Dar un score una vez finalizada la reservacion


### Host

1. Ver los lugares
2. Puede ver la informacion de un lugar
3. Reservar
4. Dar un score una vez finalizada la reservacion
5. Crear lugares
6. Cancelar reservaciones de los lugares donde es host
7. Puede ver los perfines de usuario
8. Puede ver todos los lugares qie le pertenecen
9. Editar el lugar
10. Eliminar el lugar

### Admin

1. Ver los lugares
2. Puede ver la informacion de un lugar
3. Reservar
4. Dar un score una vez finalizada la reservacion
5. Puede ver los perfines de usuario
6. Editar el lugar
7. Eliminar el lugar
8. Modificar Roles
9. Eliminar un Usuario
10. Modificar un Usuario
11. Ver lugares de los hots


# Rutas

## lista de rutas 
- /api/v1/users
- /api/v1/users/:id
- /api/v1/users/me
- /api/v1/users/me/accommodations
- /api/v1/users/me/accommodations/:id
- /api/v1/users/me/reservations
- /api/v1/users/me/reservations/:id
- /api/v1/users/me/reservations/:id/cancel


- /api/v1/accommodations/
- /api/v1/accommodations/:id
- /api/v1/accommodations/:id/make-reservation


- /api/v1/reservations/


- /api/v1/auth/login
- /api/v1/auth/register



## VERBOS

- /api/v1/users
- - GET 

- /api/v1/users/:id
- - GET 
- - PUT (ADMIN)
- - DELETE (ADMIN)

- /api/v1/users/me
- - GET
- - PUT
- - DELETE

- /api/v1/users/me/accommodations
- - POST
- - GET

- /api/v1/users/me/accommodations/:id
- - GET
- - DELETE
- - PUT

- /api/v1/users/me/reservations
- - GET

- /api/v1/users/me/reservations/:id
- - GET

- /api/v1/users/me/reservations/:id/cancel
- - PUT

- /api/v1/auth/login
- - POST

- /api/v1/auth/register
- - POST

- /api/v1/auth/password-recovery
- - POST 
- - PATCH


### Accommodations

- /api/v1/accommodations/
- - GET

- /api/v1/accommodations/:id
- - GET

- /api/v1/accommodations/:id/make-reservation
- - POST


### Reservaations 

- /api/v1/reservations/
- - GET


### Auth

- /api/v1/auth/login
- - POST

- /api/v1/auth/register
- - POST

