--Creación de la tabla
CREATE TABLE Alumno (
	IdAlumno int IDENTITY(1,1) NOT NULL,
	Nombre nvarchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
	Grado nvarchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
	Edad int NOT NULL,
	Activo bit DEFAULT 1 NOT NULL,
	CONSTRAINT PK__Alumno__460B474029D8A800 PRIMARY KEY (IdAlumno)
);

--creación del sp
CREATE PROCEDURE dbo.sp_Alumno_CRUD
    @Accion   VARCHAR(15),
    @IdAlumno INT = NULL,
    @Nombre   NVARCHAR(50) = NULL,
    @Grado    NVARCHAR(50) = NULL,
    @Edad     INT = NULL,
    @Activo   BIT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- OBTENER REGISTROS
    IF @Accion = 'GET'
    BEGIN
        SELECT IdAlumno, Nombre, Grado, Edad, Activo
        FROM Alumno;
        RETURN;
    END

    -- INSERTAR
    IF @Accion = 'INSERT'
    BEGIN
        INSERT INTO Alumno (Nombre, Grado, Edad, Activo)
        VALUES (@Nombre, @Grado, @Edad, 1);

        SELECT @@ROWCOUNT AS Afectados;
        RETURN;
    END

    -- ACTUALIZAR DATOS
    IF @Accion = 'UPDATE'
    BEGIN
        UPDATE Alumno
        SET Nombre = @Nombre,
            Grado  = @Grado,
            Edad   = @Edad
        WHERE IdAlumno = @IdAlumno;

        SELECT @@ROWCOUNT AS Afectados;
        RETURN;
    END

    
    IF @Accion = 'DELETE'
    BEGIN 
	    DELETE FROM Alumno 
	    WHERE IdAlumno = @IdAlumno; 
	    SELECT @@ROWCOUNT AS Afectados; 
	    RETURN; 
	END

    
    IF @Accion = 'ESTADO'
    BEGIN
        UPDATE Alumno
        SET Activo = @Activo
        WHERE IdAlumno = @IdAlumno;

        SELECT @@ROWCOUNT AS Afectados;
        RETURN;
    END
END


