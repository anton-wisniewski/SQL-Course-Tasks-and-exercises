import java.sql.*;

public class SelectData {
    public static void main(String[] args) throws Exception {
        SelectData main = new SelectData();
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

            resultSet = statement.executeQuery("SELECT id, name, surname, age from users WHERE age > 27");

            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String name = resultSet.getString("name");
                String surname = resultSet.getString("surname");
                int age = resultSet.getInt("age");

                System.out.println("id:" + id + " name:" + name + " surname:" + surname + " age:" + age);
            }

            System.out.println("Program finished");
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
