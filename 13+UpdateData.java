import java.sql.*;

public class UpdateData {
    public static void main(String[] args) throws Exception {
        UpdateData main = new UpdateData();
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

            statement.executeUpdate("UPDATE users SET surname = 'Nowaczewska' WHERE surname = 'Nowak' ");

            System.out.println("Data updated in db.");
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
