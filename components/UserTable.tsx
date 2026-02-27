type User = {
  id: number;
  name: string;
  email: string;
};

type Props = {
  users: User[];
};

export default function UserTable({ users }: Props) {
  console.log("UserTable received:", users)
  console.log("Is array?", Array.isArray(users))
  return (
    <div className="table-container">
      <table className="nice-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}