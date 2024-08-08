import java.sql.*;

public class CreateTable {
    public static void main(String[] args) throws Exception {
        CreateTable main = new CreateTable();
        main.run();
    }

    private Connection connect = null;
    private Statement statement = null;
    private PreparedStatement preparedStatement = null;
    private ResultSet resultSet = null;

    public void run() throws Exception {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            connect = DriverManager.getConnection("jdbc:mysql://localhost/exampledb?user=root&password=");

            statement = connect.createStatement();

            String sql = "CREATE TABLE IF NOT EXISTS users " +
                         "(id INTEGER not NULL AUTO_INCREMENT, " +
                         " name VARCHAR(32), " +
                         " surname VARCHAR(64), " +
                         " age INTEGER, " +
                         " PRIMARY KEY(id) )";
            statement.executeUpdate(sql);

            System.out.println("Created new table in db");
        } catch (Exception e) {
            throw e;
        } finally {
            close();
        }
    }

    private void close() {
        try {
            if (resultSet != null) resultSet.close();
            if (statement != null) statement.close();
            if (connect != null) connect.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
