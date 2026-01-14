# 🎓 Proyecto CRUD Alumnos - Ollamani (Examen Técnico)

Este proyecto es una aplicación web desarrollada en .NET Framework. Implementa una solución CRUD (Create, Read, Update, Delete) utilizando una arquitectura de una sola página (SPA) mediante AJAX e integración de componentes de alta fidelidad.

## 📋 Etapas del Proyecto Implementadas
1. **Etapa 1:** Creación de proyecto base con ASP.NET MVC y Entity Framework.
2. **Etapa 1.2:** Migración a **Direct Query** utilizando `System.Data.SqlClient` y Stored Procedures para optimización y control total de la base de datos.
3. **Etapa 2:** Implementación de interfaz asíncrona con **AJAX jQuery** y diálogos dinámicos mediante **SweetAlert 2**.
4. **Etapa 3:** Integración de controles **DevExpress (DevExtreme)** para una visualización y captura de datos.

## 🛠️ Tecnologías y Versiones
* **IDE:** Visual Studio 2022
* **Framework:** .NET Framework 4.6.1
* **Lenguaje:** C#
* **Base de Datos:** SQL Server
* **Frontend:** * DevExpress DevExtreme v25.2 (vía npm)
    * SweetAlert 2
    * Bootstrap 4
    * jQuery 3.6
    * Link de documentación necesaria para la instalación; https://js.devexpress.com/jQuery/Documentation/Guide/Common/Distribution_Channels/

## 🚀 Guía de Configuración (Post-Clonación)

Después de clonar el repositorio, siga estos pasos obligatorios para asegurar el correcto funcionamiento del proyecto:

### 1. Configuración de Base de Datos
* Localice la carpeta **`Database`** en la raíz del proyecto.
* Ejecute los scripts SQL contenidos en dicha carpeta (`Table_Create.sql` y `StoredProcedure.sql`) para crear la estructura de la tabla `Alumno` y la lógica del procedimiento `sp_Alumno_CRUD` en su base de datos local.

### 2. Configuración del Web.config
El archivo `Web.config` ha sido omitido por seguridad. Para habilitarlo:
1. Cree un archivo llamado `Web.config` en la raíz del proyecto.
2. Configure la sección `<connectionStrings>` agregando su cadena de conexión local apuntando a la base de datos **Ollimani**.
   ```xml
   <connectionStrings>
     <add name="DefaultConnection"
	 connectionString="Data Source=tu servicio;Initial Catalog=Ollamani;User Id=tu usuario;Password=tu password;Trusted_Connection=True;"
	 providerName="sql || mysql...." />
   </connectionStrings>
