package com.example.backend_voley.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.jdbc.core.JdbcTemplate;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Controlador para probar la conexión a la base de datos PostgreSQL
 */
@RestController
@RequestMapping("/api/test")
public class DatabaseTestController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * Endpoint simple para verificar que el servidor está funcionando
     */
    @GetMapping("/ping")
    public ResponseEntity<Map<String, Object>> ping() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "¡Servidor Spring Boot funcionando correctamente!");
        response.put("timestamp", LocalDateTime.now());
        response.put("server", "backend-voley");
        
        return ResponseEntity.ok(response);
    }

    /**
     * Endpoint para probar la conexión a PostgreSQL
     */
    @GetMapping("/database")
    public ResponseEntity<Map<String, Object>> testDatabaseConnection() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Probar consulta básica
            String currentTime = jdbcTemplate.queryForObject(
                "SELECT NOW()::text as current_time", 
                String.class
            );
            
            // Obtener versión de PostgreSQL
            String postgresVersion = jdbcTemplate.queryForObject(
                "SELECT version()", 
                String.class
            );
            
            // Verificar esquema voley
            Integer schemaExists = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM information_schema.schemata WHERE schema_name = 'voley'", 
                Integer.class
            );
            
            // Obtener tablas del esquema voley
            List<String> tables = jdbcTemplate.queryForList(
                "SELECT table_name FROM information_schema.tables WHERE table_schema = 'voley' ORDER BY table_name", 
                String.class
            );
            
            // Contar registros en cada tabla
            Map<String, Integer> tableCounts = new HashMap<>();
            for (String table : tables) {
                try {
                    Integer count = jdbcTemplate.queryForObject(
                        "SELECT COUNT(*) FROM voley." + table, 
                        Integer.class
                    );
                    tableCounts.put(table, count);
                } catch (Exception e) {
                    tableCounts.put(table, -1); // Error al contar
                }
            }
            
            // Construir respuesta exitosa
            response.put("status", "success");
            response.put("message", "✅ Conexión a PostgreSQL exitosa");
            response.put("database_time", currentTime);
            response.put("postgres_version", postgresVersion.split(" ")[1]); // Solo versión
            response.put("schema_voley_exists", schemaExists > 0);
            response.put("tables_found", tables);
            response.put("table_counts", tableCounts);
            response.put("total_tables", tables.size());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            // Error en la conexión
            response.put("status", "error");
            response.put("message", "❌ Error de conexión a PostgreSQL");
            response.put("error", e.getMessage());
            response.put("error_type", e.getClass().getSimpleName());
            
            // Diagnósticos específicos
            if (e.getMessage().contains("Connection refused")) {
                response.put("diagnosis", "PostgreSQL no está ejecutándose o el puerto 5432 está bloqueado");
                response.put("solution", "Verificar que PostgreSQL esté iniciado y escuchando en puerto 5432");
            } else if (e.getMessage().contains("authentication failed")) {
                response.put("diagnosis", "Credenciales incorrectas");
                response.put("solution", "Verificar usuario 'ucb' y contraseña 'Tarija2024'");
            } else if (e.getMessage().contains("database") && e.getMessage().contains("does not exist")) {
                response.put("diagnosis", "Base de datos 'voley' no existe");
                response.put("solution", "Crear la base de datos 'voley' en PostgreSQL");
            }
            
            return ResponseEntity.status(500).body(response);
        }
    }

    /**
     * Endpoint para obtener información detallada de las tablas
     */
    @GetMapping("/tables")
    public ResponseEntity<Map<String, Object>> getTablesInfo() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Obtener información detallada de cada tabla
            List<Map<String, Object>> tablesInfo = jdbcTemplate.queryForList(
                """
                SELECT 
                    t.table_name,
                    t.table_type,
                    obj_description(c.oid) as table_comment
                FROM information_schema.tables t
                LEFT JOIN pg_class c ON c.relname = t.table_name
                LEFT JOIN pg_namespace n ON n.oid = c.relnamespace
                WHERE t.table_schema = 'voley'
                  AND n.nspname = 'voley'
                ORDER BY t.table_name
                """
            );
            
            // Para cada tabla, obtener información de columnas
            Map<String, List<Map<String, Object>>> columnsInfo = new HashMap<>();
            for (Map<String, Object> table : tablesInfo) {
                String tableName = (String) table.get("table_name");
                
                List<Map<String, Object>> columns = jdbcTemplate.queryForList(
                    """
                    SELECT 
                        column_name,
                        data_type,
                        is_nullable,
                        column_default,
                        character_maximum_length,
                        numeric_precision,
                        numeric_scale
                    FROM information_schema.columns
                    WHERE table_schema = 'voley' 
                      AND table_name = ?
                    ORDER BY ordinal_position
                    """, 
                    tableName
                );
                
                columnsInfo.put(tableName, columns);
            }
            
            response.put("status", "success");
            response.put("message", "Información de tablas obtenida exitosamente");
            response.put("tables", tablesInfo);
            response.put("columns", columnsInfo);
            response.put("total_tables", tablesInfo.size());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Error al obtener información de tablas");
            response.put("error", e.getMessage());
            
            return ResponseEntity.status(500).body(response);
        }
    }
}