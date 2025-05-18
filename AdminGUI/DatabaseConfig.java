public class DatabaseConfig {
    private final String username;
    private final String password;
    private final String databaseUrl;

    public DatabaseConfig(String username, String password, String databaseUrl) {
        this.username = username;
        this.password = password;
        this.databaseUrl = databaseUrl;
    }

    public String getUsername() { return username; }
    public String getPassword() { return password; }
    public String getDatabaseUrl() { return databaseUrl; }

    // ✅ Add this main method
    public static void main(String[] args) {
        DatabaseConfig config = new DatabaseConfig("root", "", "localhost:3306/main");
        System.out.println("Username: " + config.getUsername());
        System.out.println("Password: " + config.getPassword());
        System.out.println("Database URL: " + config.getDatabaseUrl());
    }
}
