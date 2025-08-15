export default function Stats({ completed, pending, total }) {
  return (
    <div className="d-flex justify-content-around py-3">
      <div className="text-center">
        <h4 className="text-success">{completed}</h4>
        <small>Completed Tasks</small>
      </div>
      <div className="text-center">
        <h4 className="text-danger">{pending}</h4>
        <small>Pending Tasks</small>
      </div>
      <div className="text-center">
        <h4>{total}</h4>
        <small>Tasks Created</small>
      </div>
    </div>
  );
}
