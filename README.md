# Pomodoro timer

El desarrollo es una web aprovechar organizarse con la técnica pomodoro. Es una web responsive desarrollada con Vue.js, Vuex y Vuetify.

## Instalación

Descargar del repositorio la rama master.

Dentro del directorio raiz ejecutaremos:
```bash
npm install
```

## Ejecución

Lo primero que necesitamos es renombrar el fichero .env.example a .env y dar valor a la constante de acceso al api de pomodoro.

Una vez instaladas las dependencias podremos ejecutar la web app, para ello, dentro del directorio raíz ejecutaremos:
```bash
npm run serve
```
este paso arrancará la aplicación.
Si la web se ha levantado correctamente, y no hemos cambiado la configuración por defecto, podremos probarla lanzando la siguiente url:

```bash
http://localhost:8080/

```

Esto mostrara la pagina inicial.
Sin tener un usuario logado, podremos utilizar el timer pero no se guardara el historial y al cerrar la session se perderan las tareas creadas.
Si creamos un usuario y nos logamos con el todo el trabajo que realicemos persistira y podremos consultar el historico de las tareas realizadas.
Para crear tareas debemos pulsar el boton + que aparece en la seccion de tareas pendientes, esta accion creara una tarea pendiente de ser iniciada.
Al iniciar una tarea se activara el timer que pasara por secciones de pomodoro (25 minutos), descanso corto (5 minutos), pomodoro, descanso corto, pomodoro, descanso largo (15 minutos), sucesivamente hasta pulsar el boton de finalizar tarea.
Al finalizar la tarea, esta pasara a la seccion de Tareas finalizadas contabilizando el numero de tramos pomodoro utilizado para completarla.

### Url de prueba para la web

Para probar la web sin tener que levantarla en local,la he dejado levantado en una instancia Ec2. Podemos acceder a traves de la url 
www.pomodoro.franfernandezfullstack.es


## Version

 V1.0