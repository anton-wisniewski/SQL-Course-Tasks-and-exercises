import java.sql.*;

public class InsertData {
    public static void main(String[] args) throws Exception {
        InsertData main = new InsertData();
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

            statement.executeUpdate("INSERT INTO users (name, surname, age) VALUES('Kasia', 'Kowalska', 32)");
            statement.executeUpdate("INSERT INTO users (name, surname, age) VALUES('Adam', 'Adamski', 27)");
            statement.executeUpdate("INSERT INTO users (name, surname, age) VALUES('Ania', 'Nowak', 29)");

            System.out.println("Data saved to db.");
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
